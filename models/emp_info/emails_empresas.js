const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const emails_empresas = sequelize.define('emails_empresas', {
    eml_emp_cod: { // Codigo do email de empresa
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eml_emp_end: { // Endereco do email de empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    eml_emp: { // qual empresa esse endereço pertence
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'emails_empresas',
    timestamps: false
})

module.exports = emails_empresas