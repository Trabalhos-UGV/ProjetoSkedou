const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const enderecos = sequelize.define('enderecos', {
    end_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    end_num: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    end_rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_cid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    end_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    end_cep: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'enderecos',
    timestamps: false
})

module.exports = enderecos