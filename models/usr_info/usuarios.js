const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const usuario = sequelize.define("usuarios", {
    usr_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    usr_nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    usr_eml: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usr_tel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usr_cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
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