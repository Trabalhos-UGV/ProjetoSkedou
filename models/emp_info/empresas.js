const { DataTypes } = require('sequelize')
const sequelize = require('../../src/db/cnx');
const usuario = require()

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
        type: DataTypes.STRING,
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
    }
},
{
    tableName: 'empresas',
    timestamps: false
})

emp_usr.

module.exports = empresa;