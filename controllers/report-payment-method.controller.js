import { Op, fn, col, where } from 'sequelize';
import SalesPayment from '../models/sales-payment-method.js';
import Branch from '../models/branch.js';
import PaymentMethod from '../models/payment-method.js';

export const getPaymentMethodReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Both startDate and endDate are required.' });
    }

    const paymentMethods = await PaymentMethod.findAll({
      attributes: ['idPaymentMethod', 'paymentMethodName'],
      order: [['idPaymentMethod', 'ASC']],
      raw: true,
    });

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      order: [['idBranch', 'ASC']],
      raw: true,
    });

    const payments = await SalesPayment.findAll({
      where: {
        salesPaymentDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'idBranch',
        'idPaymentMethod',
        [SalesPayment.sequelize.fn('SUM', SalesPayment.sequelize.col('payment_amount')), 'total'],
      ],
      group: ['idBranch', 'idPaymentMethod'],
      raw: true,
    });

    const result = [];

    for (const branch of branches) {
      const row = {
        branch: branch.branchName,
      };
      let branchTotal = 0;

      for (const method of paymentMethods) {
        const payment = payments.find(
          p => p.idBranch === branch.idBranch && p.idPaymentMethod === method.idPaymentMethod,
        );
        const value = payment ? parseFloat(payment.total) : 0;
        row[method.paymentMethodName.toUpperCase()] = value;
        branchTotal += value;
      }

      row.TOTAL = branchTotal;
      result.push(row);
    }

    const overallTotal = {
      branch: 'TOTAL GENERAL',
    };
    let sumOverall = 0;

    for (const method of paymentMethods) {
      const sum = result.reduce(
        (acc, row) => acc + (row[method.paymentMethodName.toUpperCase()] || 0),
        0,
      );
      overallTotal[method.paymentMethodName.toUpperCase()] = sum;
      sumOverall += sum;
    }
    overallTotal.TOTAL = sumOverall;

    result.push(overallTotal);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getPaymentMethodDailyReport = async (req, res) => {
  try {
    const { idPaymentMethod, year, month } = req.query;

    if (!idPaymentMethod || !year || !month) {
      return res.status(400).json({ message: 'idPaymentMethod, year, and month are required.' });
    }

    const monthStr = String(month).padStart(2, '0');
    const startOfMonth = `${year}-${monthStr}-01`;
    const endOfMonthDate = new Date(year, month, 0);
    const endOfMonth = endOfMonthDate.toISOString().slice(0, 10);

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      order: [['idBranch', 'ASC']],
      raw: true,
    });

    const datesResult = await SalesPayment.findAll({
      where: {
        idPaymentMethod: Number(idPaymentMethod),
        salesPaymentDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      attributes: [[fn('DATE', col('sales_payment_date')), 'salesPaymentDate']],
      group: [fn('DATE', col('sales_payment_date'))],
      order: [[fn('DATE', col('sales_payment_date')), 'ASC']],
      raw: true,
    });

    const dates = datesResult.map(r => r.salesPaymentDate);

    const result = [];
    for (const date of dates) {
      const row = {};
      row.DATE = date.split('T')[0].split('-').reverse().join('/');
      let totalDay = 0;

      for (const branch of branches) {
        const paymentSum = await SalesPayment.sum('payment_amount', {
          where: {
            idPaymentMethod: Number(idPaymentMethod),
            idBranch: branch.idBranch,
            [Op.and]: [where(fn('DATE', col('sales_payment_date')), date)],
          },
        });
        const value = paymentSum ? Number(paymentSum) : 0;
        row[branch.branchName.toUpperCase().replace(/\s+/g, '_')] = value;
        totalDay += value;
      }
      row.TOTAL = totalDay;
      result.push(row);
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
