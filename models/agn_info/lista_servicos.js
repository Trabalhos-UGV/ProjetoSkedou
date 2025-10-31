const { now } = require('sequelize/lib/utils')
const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const lista_servicos = sequelize.define('lista_servicos', {
    lis_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    lis_sev: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lis_agn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lis_dat_inc: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: now
    }
},
{
    tableName: 'lista_servicos',
    timestamps: false
})

module.exports = lista_servicos