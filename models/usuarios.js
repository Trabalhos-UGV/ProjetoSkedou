const sequelize = require('../src/db/cnx')
const { DataTypes } = require('sequelize')

const usuario = sequelize.define("usuarios", {
    usr_cod: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})