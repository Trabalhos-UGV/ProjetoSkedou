const { DataTypes } = require('sequelize')
const sequelize = require('../src/db/cnx');

const clientes = sequelize.define("clientes", {
    //codigo do cliente
    cli_cod: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    //usuário do cliente, foreign key da tabela usuarios
    cli_usr:{
        type: DataTypes.BIGINT
    },
    //nome do cliente
    cli_nom:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    tableName: 'clientes',
    //sem timestamp
    timestamps: false
})

module.exports = clientes;