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
 *                 properties:
 *                   id_sales_branch:
 *                     type: integer
 *                     example: 38
 *                   branch_name:
 *                     type: string
 *                     example: DELTA
 *                   date_sales_branch:
 *                     type: string
 *                     format: date
 *                     example: 2025-07-03
 *                   sales_branch_total:
 *                     type: string
 *                     example: "72000"
 *                   notes:
 *                     type: string
 *                     example: ""
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
 *                 properties:
 *                   id_employee:
 *                     type: integer
 *                     description: ID único del empleado
 *                     example: 6
 *                   full_name:
 *                     type: string
 *                     description: Nombre completo del empleado
 *                     example: PAULA GARCIA MENDEZ
 *                   first_name:
 *                     type: string
 *                     description: Primer nombre(s) del empleado
 *                     example: PAULA
 *                   last_name:
 *                     type: string
 *                     description: Apellido paterno
 *                     example: GARCIA
 *                   middle_name:
 *                     type: string
 *                     description: Apellido materno
 *                     example: MENDEZ
 *                   bank:
 *                     type: string
 *                     description: Banco asociado para pagos
 *                     example: NU
 *                   account_number:
 *                     type: string
 *                     description: Número de cuenta bancaria
 *                     example: "8493029384756102938"
 *                   position:
 *                     type: string
 *                     description: Puesto del empleado
 *                     example: VENDEDOR
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
 *                 properties:
 *                   id_branch:
 *                     type: integer
 *                     description: ID único de la sucursal
 *                     example: 4
 *                   branch_name:
 *                     type: string
 *                     description: Nombre de la sucursal
 *                     example: GALERIAS INSURGENTES
 */
router.get('/branches', getBranches);

export default router;
