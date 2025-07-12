import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const SalesBranch = db.define(
  'SalesBranch',
  {
    id_sales_branch: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_branch: {
      type: DataTypes.INTEGER,
    },
    branch_name: {
      type: DataTypes.STRING,
    },
    date_sales_branch: {
      type: DataTypes.DATE,
    },
    sales_branch_total: {
      type: DataTypes.DECIMAL,
    },
    notes: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'sales_branch',
  },
);

export default SalesBranch;
