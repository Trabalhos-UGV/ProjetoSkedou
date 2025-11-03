const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const telefones_empresas = sequelize.define('telefones_empresas',{
    tel_emp_cod: { //Codigo do telefone
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tel_emp_num: { //Numero de telefone
        type: DataTypes.STRING,
        allowNull: false
    },
    tel_emp: { // Qual empresa é esse numero
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'telefones_empresas',
    timestamps: false
})

module.exports = telefones_empresas