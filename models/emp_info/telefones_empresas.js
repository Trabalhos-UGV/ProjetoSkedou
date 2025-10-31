const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const telefones_empresas = sequelize.define('telefones_empresas',{
    tel_emp_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    tel_emp_ddd: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    tel_emp_num: {
        type: DataTypes.STRING(11),
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