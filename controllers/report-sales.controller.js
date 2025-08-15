import { Op, fn, col, where } from 'sequelize';
import Branch from '../models/branch.js';
import SalesBranch from '../models/sales-branch.js';
import SalesEmployee from '../models/sales-employee.js';
import Employee from '../models/employees.js';

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
      salesWhere = where(fn('DATE', col('date_sales_branch')), date);
    } else if (/^\d{4}-\d{2}$/.test(date)) {
      salesWhere = where(fn('DATE_FORMAT', col('date_sales_branch'), '%Y-%m'), date);
    } else if (/^\d{4}$/.test(date)) {
      salesWhere = where(fn('YEAR', col('date_sales_branch')), date);
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

export const getSalesBranchChartReport = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'El parámetro month es requerido (YYYY-MM)' });
    }

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      order: [['idBranch', 'ASC']],
      raw: true,
    });

    const salesWhere = where(fn('DATE_FORMAT', col('date_sales_branch'), '%Y-%m'), month);

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
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export const getSalesEmployeeChartReport = async (req, res) => {
  try {
    const { month, limit } = req.query;

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'El parámetro month es requerido (YYYY-MM)' });
    }

    const salesWhere = where(fn('DATE_FORMAT', col('date_sales_employees'), '%Y-%m'), month);

    const topSellers = await SalesEmployee.findAll({
      where: salesWhere,
      include: [
        {
          model: Employee,
          attributes: ['fullName', 'position'],
          where: {
            position: {
              [Op.in]: ['VENDEDOR', 'GERENTE', 'CERRADOR'],
            },
          },
          required: true,
        },
      ],
      attributes: ['idEmployee', [fn('SUM', col('sale_employees')), 'totalSales']],
      group: ['idEmployee', 'Employee.id_employee'],
      order: [[fn('SUM', col('sale_employees')), 'DESC']],
      limit: limit ? parseInt(limit, 10) : 10,
      raw: true,
      nest: true,
    });

    const result = topSellers.map(seller => ({
      employee: seller.Employee.fullName,
      position: seller.Employee.position,
      sales: Number(seller.totalSales),
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
