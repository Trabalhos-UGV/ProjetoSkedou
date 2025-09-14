const { DataTypes } = require('sequelize')
const sequelize = require('../src/db/cnx');

const historico = sequelize.define('preco_lista', {
    //nome do cliente em clientes.cli_nom (esta lsitado como chave primaria pois senão o sequelize adiciona 'id' na busca)
    nome_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    //data do ultimo agendamento em solicitacoes.sol_dat
    ultimo_agendamento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    //quantidade de servicos feitos em lista_servicos.lis_sev_cod (está contando a quantidade servicos agrupando pelo usr_cod)
    quan_servicos: {
        type: DataTypes.BIGINT
    },
    //Valor total dos servicos
    valor_solicitacao: {
        type: DataTypes.NUMBER
    }
},
{
    tableName: 'preco_lista',
    timestamps: false
})

module.exports = historico;