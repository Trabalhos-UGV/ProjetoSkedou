const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const horarios_funcionamento = sequelize.define('horarios_funcionamento',{
    hor_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hor_sem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hor_aberto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hor_abt: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hor_fch: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hor_meiodia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hor_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'horarios_funcionamento'
})

module.exports = horarios_funcionamento