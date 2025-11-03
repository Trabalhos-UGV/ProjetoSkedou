const sequelize = require('../../src/db/cnx')
const { DataTypes } = require('sequelize')

const horarios_funcionamento = sequelize.define('horarios_funcionamento',{
    hor_cod: { //Código do horario
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hor_sem: { //Dia da semana deste horario
        type: DataTypes.STRING,
        allowNull: false
    },
    hor_aberto: { //Se a empresa abre neste dia
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hor_abt: { //Que horas a empresa abre, 00:00:00 se não abrir no dia
        type: DataTypes.TIME,
        allowNull: false
    },
    hor_fch: { //Que horas a empresa fecha, 00:00:00 se não abrir no dia
        type: DataTypes.TIME,
        allowNull: false
    },
    hor_meiodia: { //Se a empresa fecha meio dia, true ela fecha false ela abre
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hor_emp: { //Qual empresa é esse horario
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'horarios_funcionamento'
})

module.exports = horarios_funcionamento