const servicos = require('./servicos')
const empresas = require('../emp_info/empresas')
const sequelize = require('../../src/db/cnx')

empresas.hasMany(servicos, {
    foreignKey: 'sev_emp',
    targetKey: 'emp_cod',
    as: 'servico_empresa'
})

module.exports = {
    servicos,
    empresas,
    sequelize
}