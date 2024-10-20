const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "EMP_CODIGO",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "EMP_NOMBRE",
    },
    entryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "EMP_FECHA_INGRESO",
    },
    salary: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      field: "EMP_SALARIO",
    },
  },
  {
    tableName: "EMP_EMPLEADOS",
    timestamps: false,
  }
);

module.exports = Employee;
