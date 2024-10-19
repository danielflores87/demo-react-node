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
    documentType: {
      type: DataTypes.STRING(4),
      allowNull: false,
      field: "USR_TIPO_DOCUMENTO",
    },
    documentNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: "USR_NUMERO_DOCUMENTO",
    },
    names: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "USR_NOMBRES",
    },
    surnames: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "USR_APELLIDOS",
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
