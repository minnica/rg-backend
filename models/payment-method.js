import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const PaymentMethod = db.define(
  'PaymentMethod',
  {
    id_payment_method: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_method_name: { type: DataTypes.STRING },
  },
  {
    tableName: 'payment_method',
    timestamps: false,
  },
);

export default PaymentMethod;
