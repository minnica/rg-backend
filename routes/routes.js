import express from 'express';
import { getSalesBranch } from '../controllers/salesBranch.controller.js';
import { getEmployees, createEmployee } from '../controllers/employees.controller.js';
import { getBranches } from '../controllers/branch.controller.js';
import { getPaymentMethod } from '../controllers/payment-method.controller.js';
import { login, logout, verifyToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/sales/branch', getSalesBranch);
router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.get('/branches', getBranches);
router.get('/payment-methods', getPaymentMethod);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-token', verifyToken);

export default router;
