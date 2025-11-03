const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const servicos = sequelize.define('servicos', {
    sev_cod: { // Código do serviço
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sev_nom: { // Nome do serviço
        type: DataTypes.STRING,
        allowNull: false
    },
    sev_prc: { // Preço do serviço
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
    },
    sev_dsc: { // Descrição do serviço
        type: DataTypes.TEXT,
        allowNull: false
    },
    sev_emp: { // Qual empresa esse serviço pertence
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sev_dur: { // Duração desse servico em minutos
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'servicos'
})

module.exports = servicos