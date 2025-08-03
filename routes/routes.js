import express from 'express';
import { getSalesBranch } from '../controllers/salesBranch.controller.js';
import {
  getEmployee,
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
import { login, logout, verifyToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/sales/branch', getSalesBranch);

router.get('/employees', getEmployee);
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

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-token', verifyToken);

export default router;
