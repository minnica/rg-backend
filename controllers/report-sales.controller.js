import { Op, fn, col, where as seqWhere } from 'sequelize';
import Branch from '../models/branch.js';
import SalesBranch from '../models/sales-branch.js';

export const getSalesBranchReport = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: 'date query param is required (YYYY-MM-DD, YYYY-MM, o YYYY)' });
    }

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      order: [['idBranch', 'ASC']],
      raw: true,
    });

    let salesWhere = {};
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      salesWhere = where(fn('DATE', col('date_sales_branch')), date);
    } else if (/^\d{4}-\d{2}$/.test(date)) {
      const [year, month] = date.split('-');
      salesWhere = where(fn('DATE_FORMAT', col('date_sales_branch'), '%Y-%m'), date);
    } else if (/^\d{4}$/.test(date)) {
      salesWhere = where(fn('YEAR', col('date_sales_branch')), date);
    } else {
      return res.status(400).json({ message: 'date debe ser YYYY-MM-DD, YYYY-MM o YYYY' });
    }

    const sales = await SalesBranch.findAll({
      where: salesWhere,
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

export const getSalesBranchTotalReport = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: 'date query param is required (YYYY-MM-DD, YYYY-MM, o YYYY)' });
    }

    let salesWhere = {};
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      salesWhere = seqWhere(fn('DATE', col('date_sales_branch')), date);
    } else if (/^\d{4}-\d{2}$/.test(date)) {
      salesWhere = seqWhere(fn('DATE_FORMAT', col('date_sales_branch'), '%Y-%m'), date);
    } else if (/^\d{4}$/.test(date)) {
      salesWhere = seqWhere(fn('YEAR', col('date_sales_branch')), date);
    } else {
      return res.status(400).json({ message: 'date debe ser YYYY-MM-DD, YYYY-MM o YYYY' });
    }

    const total = await SalesBranch.sum('salesBranchTotal', { where: salesWhere });
    res.json({ total: total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
