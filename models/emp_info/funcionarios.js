const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const funcionarios = sequelize.define('funcionarios', {
    fun_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fun_nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fun_set: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fun_atv: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    },
    fun_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'funcionarios',
    timestamps: false
})

module.exports = funcionarios