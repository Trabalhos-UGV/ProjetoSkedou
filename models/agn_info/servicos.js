const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const servicos = sequelize.define('servicos', {
    sev_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    sev_nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sev_prc: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
    },
    sev_dsc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sev_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sev_dur: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = servicos