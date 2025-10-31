const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const horarios_funcionamento = sequelize.define('horarios_funcionamento',{
    hor_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    hor_sem: {
        type: DataTypes.INTEGER,
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