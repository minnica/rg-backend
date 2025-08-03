import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const PaymentMethod = db.define(
  'PaymentMethod',
  {
    idPaymentMethod: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_payment_method',
    },
    paymentMethodName: { type: DataTypes.STRING, field: 'payment_method_name' },
  },
  {
    tableName: 'payment_method',
    timestamps: false,
  },
);

export default PaymentMethod;
