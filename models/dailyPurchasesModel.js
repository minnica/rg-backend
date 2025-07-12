import db from "../database/db.js";
import { DataTypes } from "sequelize";
import { paymentTypeModel, personModel, categoryModel } from '../models/index.js';

const dailyPurchasesModel = db.define('daily_purchases', {
  id_daily_purchases: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_payment_type: { type: DataTypes.INTEGER },
  id_person: { type: DataTypes.INTEGER },
  id_category: { type: DataTypes.INTEGER },
  transactions: { type: DataTypes.STRING },
  amount: { type: DataTypes.DECIMAL },
  no_interest_months: { type: DataTypes.INTEGER },
  current_month: { type: DataTypes.INTEGER },
  remaining_month: { type: DataTypes.INTEGER },
  payment: { type: DataTypes.DECIMAL },
  remaining_payment: { type: DataTypes.DECIMAL },
  paid: { type: DataTypes.BOOLEAN }
})

dailyPurchasesModel.belongsTo(paymentTypeModel, { foreignKey: 'id_payment_type' })
dailyPurchasesModel.belongsTo(personModel, { foreignKey: 'id_person' })
dailyPurchasesModel.belongsTo(categoryModel, { foreignKey: 'id_category' })

export default dailyPurchasesModel
