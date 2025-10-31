const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const agendamentos = sequelize.define('agendamentos', {
    agn_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    agn_dat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    agn_ini: {
        type: DataTypes.TIME,
        allowNull: false
    },
    agn_fim: {
        type: DataTypes.TIME,
        allowNull: true
    },
    agn_sit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agn_cli: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agn_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'agendamentos',
    timestamps: false
})

module.exports = agendamentos