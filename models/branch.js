import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const Branch = db.define(
  'Branch',
  {
    idBranch: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_branch',
    },
    branchName: { type: DataTypes.STRING, field: 'branch_name' },
  },
  {
    tableName: 'branch',
    timestamps: false,
  },
);

export default Branch;
