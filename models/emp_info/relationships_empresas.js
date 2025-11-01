const empresas = require('./empresas')
const emails_empresas = require('./emails_empresas')
const enderecos = require('./enderecos')
const funcionarios = require('./funcionarios')
const horarios_funcionamento = require('./horarios_funcionamento')
const telefones_empresas = require('./telefones_empresas')
const cidades = require('./cidades')
const sequelize = require('../../src/db/cnx')
const usuario = require('../usr_info/usuarios')

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

enderecos.belongsTo(cidades, {
    foreignKey: 'end_cid',
    targetKey: 'cid_cod',
    as: 'cidade_endereco'
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
    cidades
}