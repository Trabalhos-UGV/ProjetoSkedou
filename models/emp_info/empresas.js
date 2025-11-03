const { DataTypes } = require('sequelize')
const sequelize = require('../../src/db/cnx');

const empresa = sequelize.define("empresas", {
    emp_cod: { //Codigo da empresa
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emp_nom: { //Nome da empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_cnpj: { //Cnpj da empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_cat: { //Categoria da empresa
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emp_atv: { //Se a empresa está ativa ou não
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false
    },
    emp_usr: { //Qual usuário essa empresa pertence
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emp_dsc: { //Descrição da empresa
        type: DataTypes.TEXT,
        allowNull: false
    }
},
{
    tableName: 'empresas',
    timestamps: false
})

module.exports = empresa;