import db from '../database/db.js';
import { SalesBranch, SalesEmployee, SalesPayment, Branch } from '../models/index.js';

export const getSalesBranch = async (req, res) => {
  try {
    const salesBranch = await SalesBranch.findAll({
      include: [
        {
          model: Branch,
          attributes: ['branchName'],
        },
      ],
      attributes: ['idSalesBranch', 'dateSalesBranch', 'idBranch', 'salesBranchTotal', 'notes'],
    });

    const data = salesBranch.map(r => ({
      idSalesBranch: r.idSalesBranch,
      idBranch: r.idBranch, 
      branchName: r.Branch?.branchName,
      dateSalesBranch: r.dateSalesBranch,
      salesBranchTotal: r.salesBranchTotal,
      notes: r.notes,
    }));

    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const toCents = n => Math.round(Number(n ?? 0) * 100);
const fromCents = c => Number(c ?? 0) / 100;
const toFixed2 = n => fromCents(n).toFixed(2);

const mergeBy = (rows, key) => {
  const map = new Map();
  for (const r of rows) {
    const k = r[key];
    const prev = map.get(k);
    map.set(
      k,
      prev
        ? { ...r, amountCents: (prev.amountCents || 0) + (r.amountCents || 0) }
        : { ...r, amountCents: r.amountCents || 0 },
    );
  }
  return [...map.values()];
};

export async function createSale(req, res) {
  const t = await db.transaction();
  try {
    const { branchId, date, notes = '', employees = [], payments = [] } = req.body || {};

    if (!branchId || !date) {
      await t.rollback();
      return res.status(400).json({ message: 'branchId y date son requeridos.' });
    }
    if (!Array.isArray(employees) || employees.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'employees no puede estar vacío.' });
    }
    if (!Array.isArray(payments) || payments.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'payments no puede estar vacío.' });
    }

    const empRows = employees.map(e => ({
      employeeId: Number(e.employeeId),
      amountCents: e.amountCents ?? toCents(e.amount),
    }));
    const payRows = payments.map(p => ({
      paymentMethodId: Number(p.paymentMethodId),
      amountCents: p.amountCents ?? toCents(p.amount),
    }));

    const mergedEmp = mergeBy(empRows, 'employeeId');
    const mergedPay = mergeBy(payRows, 'paymentMethodId');

    if (
      mergedEmp.some(r => !r.employeeId || r.amountCents <= 0) ||
      mergedPay.some(r => !r.paymentMethodId || r.amountCents <= 0)
    ) {
      await t.rollback();
      return res.status(400).json({ message: 'IDs inválidos o montos <= 0.' });
    }

    const totalEmpCents = mergedEmp.reduce((s, r) => s + r.amountCents, 0);
    const totalPayCents = mergedPay.reduce((s, r) => s + r.amountCents, 0);
    if (totalEmpCents !== totalPayCents) {
      await t.rollback();
      return res.status(422).json({
        message: 'Los totales no cuadran',
        delta: fromCents(totalEmpCents - totalPayCents), // número con decimales
        totals: { employees: fromCents(totalEmpCents), payments: fromCents(totalPayCents) },
      });
    }

    const sale = await SalesBranch.create(
      {
        idBranch: branchId,
        dateSalesBranch: date,
        salesBranchTotal: toFixed2(totalEmpCents),
        notes,
      },
      { transaction: t },
    );

    await SalesEmployee.bulkCreate(
      mergedEmp.map(r => ({
        idBranch: branchId,
        dateSalesEmployee: date,
        idEmployee: r.employeeId,
        salesEmployee: toFixed2(r.amountCents),
      })),
      { transaction: t },
    );

    await SalesPayment.bulkCreate(
      mergedPay.map(r => ({
        idBranch: branchId,
        salesPaymentDate: date,
        idPaymentMethod: r.paymentMethodId,
        paymentAmount: toFixed2(r.amountCents),
      })),
      { transaction: t },
    );

    await t.commit();

    return res.status(201).json({
      saleId: sale.idSalesBranch,
      branchId,
      date,
      notes,
      total: fromCents(totalEmpCents),
      employees: mergedEmp.map(r => ({
        employeeId: r.employeeId,
        amount: fromCents(r.amountCents),
      })),
      payments: mergedPay.map(r => ({
        paymentMethodId: r.paymentMethodId,
        amount: fromCents(r.amountCents),
      })),
    });
  } catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ message: 'Error al crear la venta', error: err.message });
  }
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export async function deleteSales(req, res) {
  const branchId = Number(req.query.branchId ?? req.params.branchId);
  const date = String((req.query.date ?? req.params.date) || '');

  if (!branchId || !isoDateRegex.test(date)) {
    return res
      .status(400)
      .json({ message: 'branchId (number) y date (YYYY-MM-DD) son requeridos.' });
  }

  const t = await db.transaction();
  try {
    const [countBranch, countEmp, countPay] = await Promise.all([
      SalesBranch.count({ where: { idBranch: branchId, dateSalesBranch: date }, transaction: t }),
      SalesEmployee.count({
        where: { idBranch: branchId, dateSalesEmployee: date },
        transaction: t,
      }),
      SalesPayment.count({ where: { idBranch: branchId, salesPaymentDate: date }, transaction: t }),
    ]);

    if (countBranch + countEmp + countPay === 0) {
      await t.rollback();
      return res.status(404).json({ message: 'No hay registros para ese branchId y date.' });
    }

    const [deletedEmp, deletedPay] = await Promise.all([
      SalesEmployee.destroy({
        where: { idBranch: branchId, dateSalesEmployee: date },
        transaction: t,
      }),
      SalesPayment.destroy({
        where: { idBranch: branchId, salesPaymentDate: date },
        transaction: t,
      }),
    ]);

    const deletedBranch = await SalesBranch.destroy({
      where: { idBranch: branchId, dateSalesBranch: date },
      transaction: t,
    });

    await t.commit();

    return res.status(200).json({
      message: 'Registros eliminados correctamente.',
      branchId,
      date,
      deleted: {
        sales_branch: deletedBranch,
        sales_employees: deletedEmp,
        sales_payment: deletedPay,
      },
    });
  } catch (err) {
    await t.rollback();
    console.error('[DELETE /sales] error:', err);
    return res.status(500).json({ message: 'Error al eliminar registros.', error: err.message });
  }
}
