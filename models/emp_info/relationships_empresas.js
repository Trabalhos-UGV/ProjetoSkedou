const empresas = require('./empresas')
const emails_empresas = require('./emails_empresas')
const enderecos = require('./enderecos')
const funcionarios = require('./funcionarios')
const horarios_funcionamento = require('./horarios_funcionamento')
const telefones_empresas = require('./telefones_empresas')
/* const cidades = require('./cidades') */
const sequelize = require('../../src/db/cnx')
const usuario = require('../usr_info/usuarios')
const avaliacaoes = require('./avalicoes')

usuario.hasMany(avaliacaoes, {
    foreignKey: 'ava_usr',
    targetKey: 'usr_cod',
    as: 'usuario_avaliacao'
})

empresas.hasMany(avaliacaoes, {
    foreignKey: 'ava_emp',
    targetKey: 'emp_cod',
    as: 'empresa_avaliacao'
})

telefones_empresas.belongsTo(empresas, {
    foreignKey: 'tel_emp',
    targetKey: 'emp_cod',
    as: 'telefone_empresa'
})

emails_empresas.belongsTo(empresas,{
    foreignKey: 'eml_emp',
    targetKey: 'emp_cod',
    as: 'email_empresa'
})

empresas.hasMany(horarios_funcionamento, {
    foreignKey: 'hor_emp',
    sourceKey: 'emp_cod',
    as: 'horario_de_funcionamento'
})

empresas.hasMany(telefones_empresas, {
    foreignKey: 'tel_emp',
    sourceKey: 'emp_cod',
    as: 'telefone_empresa'
})

empresas.hasMany(emails_empresas, {
    foreignKey: 'eml_emp',
    sourceKey: 'emp_cod',
    as: 'email_empresa'
})

empresas.hasMany(enderecos, {
    foreignKey: 'end_emp',
    sourceKey: 'emp_cod',
    as: 'enderecos_empresa'
})

empresas.hasMany(funcionarios, {
    foreignKey: 'fun_emp',
    sourceKey: 'emp_cod',
    as: 'funcionario'
})

enderecos.belongsTo(empresas, {
    foreignKey: 'end_emp',
    targetKey: 'emp_cod',
    as: 'enderecos_empresa'
})

funcionarios.belongsTo(empresas, {
    foreignKey: 'fun_emp',
    targetKey: 'emp_cod',
    as: 'funcionario'
})

horarios_funcionamento.belongsTo(empresas, {
    foreignKey:'hor_emp',
    targetKey: 'emp_cod',
    as: 'horario_de_funcionamento'
})

empresas.belongsTo(usuario, {
    foreignKey: 'emp_usr',
    targetKey: 'usr_cod',
    as: 'empresa_usuario'
})

module.exports = {
    sequelize,
    empresas,
    horarios_funcionamento,
    funcionarios,
    emails_empresas,
    telefones_empresas,
    enderecos,
    usuario,
    avaliacaoes
}