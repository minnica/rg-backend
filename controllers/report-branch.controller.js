import { Op } from 'sequelize';
import SalesBranch from '../models/sales-branch.js';
import Branch from '../models/branch.js';
import { addTotalsRow } from '../utils/addTotalsRow.js';

export const getBranchReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Both startDate and endDate are required.' });
    }

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      raw: true,
    });

    const sales = await SalesBranch.findAll({
      where: {
        dateSalesBranch: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'dateSalesBranch',
        'idBranch',
        [SalesBranch.sequelize.fn('SUM', SalesBranch.sequelize.col('sales_branch_total')), 'total'],
      ],
      group: ['dateSalesBranch', 'idBranch'],
      raw: true,
    });

    const uniqueDates = [...new Set(sales.map(s => s.dateSalesBranch))].sort();

    const result = [];
    for (const date of uniqueDates) {
      const row = {
        DATE: date,
      };
      let total = 0;

      for (const branch of branches) {
        const found = sales.find(s => s.dateSalesBranch === date && s.idBranch === branch.idBranch);
        const value = found ? parseFloat(found.total) : 0;
        const key = branch.branchName.replace(/\s+/g, '_').toUpperCase();
        row[key] = value;
        total += value;
      }
      row.TOTAL = total;
      result.push(row);
    }

    const filteredResult = result.filter(r => r.DATE);

    const withTotal = addTotalsRow(filteredResult, {
      labelKey: 'DATE',
      excludeKeys: ['DATE'],
    });
    res.json(withTotal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
