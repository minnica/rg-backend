import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const SalesEmployee = db.define(
  'SalesEmployee',
  {
    idSalesEmployee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_sale_employees',
    },
    idBranch: {
      type: DataTypes.INTEGER,
      field: 'id_branch',
    },
    dateSalesEmployee: {
      type: DataTypes.DATE,
      field: 'date_sales_employees',
    },
    idEmployee: {
      type: DataTypes.INTEGER,
      field: 'id_employee',
    },
    salesEmployee: {
      type: DataTypes.DECIMAL,
      field: 'sale_employees',
    },
  },
  {
    tableName: 'sales_employees',
    timestamps: false,
  },
);

export default SalesEmployee;
