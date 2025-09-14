const { DataTypes } = require('sequelize')
const sequelize = require('../src/db/cnx');

const historico = sequelize.define('preco_lista', {
    nome_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    ultimo_agendamento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    quan_servicos: {
        type: DataTypes.BIGINT
    },
    valor_solicitacao: {
        type: DataTypes.NUMBER
    }
},
{
    tableName: 'preco_lista',
    timestamps: false
})

module.exports = historico;