import { Op } from 'sequelize';
import SalesPayment from '../models/sales-payment.js';
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
