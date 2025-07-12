import db from "../database/db.js";
import { DataTypes } from "sequelize";

const categoryModel = db.define('category', {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: { type: DataTypes.STRING },
  }, {
    tableName: 'category'
  })

  export default categoryModel
