const sequelize = require('../../src/db/cnx')
const { DataTypes, Model } = require('sequelize')

const emails_empresas = sequelize.define('emails_empresas', {
    eml_emp_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    eml_emp_end: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eml_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'emails_empresas',
    timestamps: false
})

module.exports = emails_empresas