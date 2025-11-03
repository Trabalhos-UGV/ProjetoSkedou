const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const avaliacaoes = sequelize.define('avaliacoes', {
    ava_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ava_nota: {
        type: DataTypes.DECIMAL(2,1),
        allowNull: false
    } ,
    ava_dsc: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ' '
    },
    ava_usr: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ava_emp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'avaliacoes',
    timestamps: false
})

module.exports = avaliacaoes