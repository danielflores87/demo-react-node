const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "USR_CODIGO",
    },
    documentNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: "USR_NUMERO_DOCUMENTO",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "USR_NOMBRE",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "USR_CORREO",
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      field: "USR_CLAVE_ACCESO",
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "USR_ROL_ACCESO",
    },
  },
  {
    tableName: "USR_USUARIOS",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["USR_CORREO"],
      },
      {
        unique: true,
        fields: ["USR_NUMERO_DOCUMENTO"],
      },
    ],
  }
);

module.exports = User;
