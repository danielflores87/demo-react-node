const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "SLC_CODIGO",
    },
    refenceCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "SLC_CODIGO_REFERENCIA",
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "SLC_DESCRIPCION",
    },
    summary: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "SLC_RESUMEN",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "SLC_CODEMP_EMPLEADO",
    },
  },
  {
    tableName: "SLC_SOLICITUDES",
    timestamps: false,
  }
);

module.exports = Employee;
