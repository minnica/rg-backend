import db from "../database/db.js";
import { DataTypes } from "sequelize";

const personModel = db.define('person', {
    id_person: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    person_name: { type: DataTypes.STRING },
  }, {
    tableName: 'person'
  })

  export default personModel
