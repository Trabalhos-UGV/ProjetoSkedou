const { DataTypes } = require('sequelize')
const sequelize = require('../src/db/cnx');

const clientes = sequelize.define("clientes", {
    cli_cod: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    cli_usr:{
        type: DataTypes.BIGINT
    },
    cli_nom:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    tableName: 'clientes',
    timestamps: false
})

module.exports = clientes;