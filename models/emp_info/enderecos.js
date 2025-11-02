const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const enderecos = sequelize.define('enderecos', {
    end_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    end_rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'enderecos',
    timestamps: false
})

module.exports = enderecos