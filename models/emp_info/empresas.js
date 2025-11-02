const { DataTypes } = require('sequelize')
const sequelize = require('../../src/db/cnx');

const empresa = sequelize.define("empresas", {
    emp_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emp_nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_cat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emp_atv: {
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false
    },
    emp_usr: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emp_dsc: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
{
    tableName: 'empresas',
    timestamps: false
})

module.exports = empresa;