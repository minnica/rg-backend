import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const SalesPayment = db.define(
  'SalesPayment',
  {
    idSalesPayment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_sales_payment',
    },
    idBranch: {
      type: DataTypes.INTEGER,
      field: 'id_branch',
    },
    salesPaymentDate: {
      type: DataTypes.DATE,
      field: 'sales_payment_date',
    },
    idPaymentMethod: {
      type: DataTypes.INTEGER,
      field: 'id_payment_method',
    },
    paymentAmount: {
      type: DataTypes.DECIMAL,
      field: 'payment_amount',
    },
  },
  {
    tableName: 'sales_payment',
    timestamps: false,
  },
);

export default SalesPayment;
