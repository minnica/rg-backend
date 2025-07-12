import db from "../database/db.js";
import { DataTypes } from "sequelize";

const paymentTypeModel = db.define('payment_type', {
    id_payment_type: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_type_name: { type: DataTypes.STRING },
    statement_closing_date: { type: DataTypes.DATE },
    payment_due_date: { type: DataTypes.DATE },
  }, {
    tableName: 'payment_type'
  })

  export default paymentTypeModel
