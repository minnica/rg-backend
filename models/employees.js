import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const Employee = db.define(
  'Employee',
  {
    id_employee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    middle_name: { type: DataTypes.STRING },
    bank: { type: DataTypes.STRING },
    account_number: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'employees',
    timestamps: false,
  },
);

export default Employee;
