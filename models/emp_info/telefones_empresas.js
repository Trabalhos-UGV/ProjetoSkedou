const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const telefones_empresas = sequelize.define('telefones_empresas',{
    tel_emp_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tel_emp_num: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tel_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'telefones_empresas',
    timestamps: false
})

module.exports = telefones_empresas