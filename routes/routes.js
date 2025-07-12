import express from 'express';
import { getAllSalesBranch } from '../controllers/salesBranch.controller.js';
const router = express.Router();

router.get('/', getAllSalesBranch);

export default router;
