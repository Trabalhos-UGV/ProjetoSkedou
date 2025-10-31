const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const telefones = sequelize.define("telefones", {
    tel_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    tel_ddd: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    tel_num: {
        type: DataTypes.STRING(9),
        allowNull: false
    }
},
{
    tableName: 'telefones',
    timestamps: false
})

module.exports = telefones;