const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const enderecos = sequelize.define('enderecos', {
    end_cod: { //Código do endereco
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    end_rua: { //Endereco completo da empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    end_emp: { //Qual empresa esse endereco pertence
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'enderecos',
    timestamps: false
})

module.exports = enderecos