const usuario = require('./usuarios')
const telefones = require('./telefones')
const emails = require('./emails')
const sequelize = require('../../src/db/cnx')

usuario.belongsTo(emails, {
    foreignKey: 'usr_eml',
    targetKey: 'eml_cod',
    as: 'email'
})

usuario.belongsTo(telefones, {
    foreignKey: 'usr_tel',
    targetKey: 'tel_cod',
    as: 'telefone'
})

module.exports = { sequelize, usuario, emails, telefones }
