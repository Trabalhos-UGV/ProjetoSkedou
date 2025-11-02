const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const cidades = sequelize.define('cidades', {
    cid_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cid_nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cid_uf: {
        type: DataTypes.STRING(2),
        allowNull: false
    }
},
{
    tableName: 'cidades',
    timestamps: false
})

module.exports = cidades