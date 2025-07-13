import express from 'express';
import { getSalesBranch } from '../controllers/salesBranch.controller.js';
import { getEmployees } from '../controllers/employees.controller.js';
import { getBranches } from '../controllers/branch.controller.js';

const router = express.Router();

router.get('/sales/branch', getSalesBranch);
router.get('/employees', getEmployees);
router.get('/branches', getBranches);

export default router;
