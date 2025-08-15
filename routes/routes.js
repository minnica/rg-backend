import express from 'express';
import { login, logout, verifyToken } from '../controllers/auth.controller.js';
import { getSalesBranch, createSale, deleteSales } from '../controllers/sales.controller.js';
import {
  getEmployee,
  getEmployeesSellers,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employees.controller.js';
import {
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} from '../controllers/branch.controller.js';
import {
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../controllers/payment-method.controller.js';

import {
  getPaymentMethodReport,
  getPaymentMethodDailyReport,
} from '../controllers/report-payment-method.controller.js';
import {
  getEmployeeReport,
  getEmployeeDailyReport,
} from '../controllers/report-employee.controller.js';
import { getBranchReport } from '../controllers/report-branch.controller.js';
import {
  getSalesBranchReport,
  getSalesBranchTotalReport,
  getSalesBranchChartReport,
  getSalesEmployeeChartReport,
} from '../controllers/report-sales.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-token', verifyToken);

router.get('/sales/branch', getSalesBranch);
router.post('/sales', createSale);
router.delete('/sales', deleteSales);

router.get('/employees', getEmployee);
router.get('/employees/sellers', getEmployeesSellers);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

router.get('/branches', getBranch);
router.post('/branches', createBranch);
router.put('/branches/:id', updateBranch);
router.delete('/branches/:id', deleteBranch);

router.get('/payment-methods', getPaymentMethod);
router.post('/payment-methods', createPaymentMethod);
router.put('/payment-methods/:id', updatePaymentMethod);
router.delete('/payment-methods/:id', deletePaymentMethod);

router.get('/reports/payment-methods', getPaymentMethodReport);
router.get('/reports/payment-methods/daily', getPaymentMethodDailyReport);
router.get('/reports/employees', getEmployeeReport);
router.get('/reports/employees/daily', getEmployeeDailyReport);
router.get('/reports/branches', getBranchReport);
router.get('/dashboard/sales/branch', getSalesBranchReport);
router.get('/dashboard/sales/branch/total', getSalesBranchTotalReport);
router.get('/dashboard/sales/branch/chart', getSalesBranchChartReport);
router.get('/dashboard/sales/employee/chart', getSalesEmployeeChartReport);

export default router;
