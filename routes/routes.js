import express from 'express';
import { getSalesBranch } from '../controllers/salesBranch.controller.js';
import { getEmployees } from '../controllers/employees.controller.js';
import { getBranches } from '../controllers/branch.controller.js';
const router = express.Router();

/**
 * @swagger
 * /keysarCosmetics/sales/branch:
 *   get:
 *     summary: Obtiene las ventas por sucursal
 *     tags:
 *       - Ventas
 *     responses:
 *       200:
 *         description: Lista de ventas por sucursal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sales/branch', getSalesBranch);

/**
 * @swagger
 * /keysarCosmetics/employees:
 *   get:
 *     summary: Obtiene la lista de empleados
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/employees', getEmployees);

/**
 * @swagger
 * /keysarCosmetics/branches:
 *   get:
 *     summary: Obtiene la lista de sucursales
 *     tags:
 *       - Sucursales
 *     responses:
 *       200:
 *         description: Lista de sucursales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/branches', getBranches);

export default router;
