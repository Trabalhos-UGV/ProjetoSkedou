const { DataTypes } = require('sequelize')
const sequelize = require('../src/db/cnx');

const empresa = sequelize.define("empresas", {
    emp_cod: {
        type: DataTypes.BIGINT,
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
    emp_typ: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'empresas',
    timestamps: false
})

module.exports = empresa;