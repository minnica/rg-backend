import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const Employee = db.define(
  'Employee',
  {
    idEmployee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_employee',
    },
    fullName: {
      type: DataTypes.STRING,
      field: 'full_name',
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    middleName: {
      type: DataTypes.STRING,
      field: 'middle_name',
    },
    bank: {
      type: DataTypes.STRING,
    },
    accountNumber: {
      type: DataTypes.STRING,
      field: 'account_number',
    },
    position: {
      type: DataTypes.STRING,
    },
    personalTarget: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'personal_target',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    tableName: 'employees',
    timestamps: false,
  },
);

export default Employee;
