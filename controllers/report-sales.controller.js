import { Op, fn, col, where, literal } from 'sequelize';
import Branch from '../models/branch.js';
import SalesBranch from '../models/sales-branch.js';

export const getSalesBranchDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'date query param is required (YYYY-MM-DD)' });
    }

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      order: [['idBranch', 'ASC']],
      raw: true,
    });

    const sales = await SalesBranch.findAll({
      where: where(fn('DATE', col('date_sales_branch')), date),
      attributes: ['idBranch', [fn('SUM', col('sales_branch_total')), 'sales']],
      group: ['idBranch'],
      raw: true,
    });

    const salesMap = Object.fromEntries(sales.map(s => [s.idBranch, parseFloat(s.sales) || 0]));

    const result = branches.map(b => ({
      branch: b.branchName,
      sales: salesMap[b.idBranch] || 0,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
