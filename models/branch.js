import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const Branch = db.define(
  'Branch',
  {
    id_branch: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch_name: { type: DataTypes.STRING },
  },
  {
    tableName: 'branch',
  },
);

export default Branch;
