const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const telefones = sequelize.define("telefones", {
    tel_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tel_num: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'telefones',
    timestamps: false
})

module.exports = telefones;