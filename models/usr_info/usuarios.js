const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const usuario = sequelize.define("usuarios", {
    usr_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usr_nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    usr_eml: { //email do usuário
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usr_tel: { //telefone do usuário
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usr_cpfcnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    usr_sen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usr_atv: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    tableName: 'usuarios',
    timestamps: false
})

module.exports = usuario;