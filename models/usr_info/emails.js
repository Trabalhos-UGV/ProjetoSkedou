const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const emails = sequelize.define("emails", {
    eml_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    eml_end: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'emails',
    timestamps: false
})

module.exports = emails