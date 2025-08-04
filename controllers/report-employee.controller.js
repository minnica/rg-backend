import { Op } from 'sequelize';
import Employee from '../models/employees.js';
import Branch from '../models/branch.js';
import SalesEmployee from '../models/sales-employee.js';

export const getEmployeeReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Both startDate and endDate are required.' });
    }

    const branches = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
      raw: true,
    });

    const employees = await Employee.findAll({
      attributes: ['idEmployee', 'fullName', 'personalTarget', 'position'],
      where: {
        position: { [Op.in]: ['VENDEDOR', 'GERENTE', 'CERRADOR'] },
      },
      raw: true,
    });

    const sales = await SalesEmployee.findAll({
      where: {
        dateSalesEmployee: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'idEmployee',
        'idBranch',
        [
          SalesEmployee.sequelize.fn('SUM', SalesEmployee.sequelize.col('sale_employees')),
          'totalSales',
        ],
      ],
      group: ['idEmployee', 'idBranch'],
      raw: true,
    });

    const result = [];
    for (const employee of employees) {
      const row = {
        EMPLOYEE: employee.fullName,
      };
      let total = 0;

      for (const branch of branches) {
        const foundSale = sales.find(
          s => s.idEmployee === employee.idEmployee && s.idBranch === branch.idBranch,
        );
        const salesValue = foundSale ? parseFloat(foundSale.totalSales) : 0;
        const key = branch.branchName.replace(/\s+/g, '_').toUpperCase();
        row[key] = salesValue;
        total += salesValue;
      }
      row.TOTAL = total;
      row.MONTHLY_TARGET = parseFloat(employee.personalTarget) || 0;
      result.push(row);
    }

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    for (const row of result) {
      const monthlyTarget = row.MONTHLY_TARGET;
      let individualTarget = 0;
      let isFullMonth = false;
      if (days >= 28 && days <= 31) {
        const startOfMonth = date1.getDate() === 1;
        const endOfMonth = new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
        const endOfMonthCheck = date2.getDate() === endOfMonth;
        const sameMonth =
          date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
        isFullMonth = startOfMonth && endOfMonthCheck && sameMonth;
      }

      if (isFullMonth) {
        individualTarget = monthlyTarget;
      } else {
        individualTarget = Math.round((monthlyTarget / 30) * days);
      }

      row.TO_GO = individualTarget - row.TOTAL;
      row.PERCENTAGE =
        individualTarget > 0 ? Math.round((row.TOTAL / individualTarget) * 10000) / 100 : 0;
    }

    result.sort((a, b) => b.TOTAL - a.TOTAL);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
