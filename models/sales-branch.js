import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const SalesBranch = db.define(
  'SalesBranch',
  {
    idSalesBranch: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_sales_branch',
    },
    idBranch: {
      type: DataTypes.INTEGER,
      field: 'id_branch',
    },
    branchName: {
      type: DataTypes.STRING,
      field: 'branch_name',
    },
    dateSalesBranch: {
      type: DataTypes.DATE,
      field: 'date_sales_branch',
    },
    salesBranchTotal: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'sales_branch_total',
    },
    notes: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'sales_branch',
    timestamps: false,
  },
);

export default SalesBranch;
