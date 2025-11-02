const { 
    empresas,
    emails_empresas,
    telefones_empresas,
    enderecos,
    horarios_funcionamento,
    sequelize
} = require('../models/emp_info/relationships_empresas')

// função para validar hora
function validateTime(time) {
    if (!time || time === '') {
        return '00:00:00' // Default time if empty
    }
    
    // checa se é no formato HH:MM ou HH:MM:SS
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/
    if (!timeRegex.test(time)) {
        return '00:00:00' // Horario padrão caso não houver
    }
    
    // Adiciona segundos se não tiver
    return time.length === 5 ? `${time}:00` : time
}

async function cadastrarEmpresa(req, res) {
    // Extrai dados do body
    const { 
        emp_nom, 
        emp_cnpj, 
        emp_cat, 
        emp_usr,
        emp_dsc,
        email,
        telefone,
        endereco,
        horarios 
    } = req.body

    // Validação básica
    if (!emp_nom || !emp_cnpj || !emp_cat || !emp_usr || !emp_dsc|| !email || !telefone || !endereco || !horarios) {
        return res.status(400).json({ 
            error: 'Todos os campos são obrigatórios' 
        })
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            // Cria empresa
            const novaEmpresa = await empresas.create({
                emp_nom,
                emp_cnpj,
                emp_cat,
                emp_usr,
                emp_dsc,
                emp_atv: true
            }, { transaction: t })

            // Cria email da empresa
            const novoEmail = await emails_empresas.create({
                eml_emp_end: email,
                eml_emp: novaEmpresa.emp_cod
            }, { transaction: t })

            // Cria telefone da empresa
            const novoTelefone = await telefones_empresas.create({
                tel_emp_num: telefone,
                tel_emp: novaEmpresa.emp_cod
            }, { transaction: t })

            // Cria endereço
            const novoEndereco = await enderecos.create({
                end_rua: endereco.rua,
                end_emp: novaEmpresa.emp_cod
            }, { transaction: t })

            // Cria horários de funcionamento com validação
            const horariosPromises = horarios.map(horario => 
                horarios_funcionamento.create({
                    hor_sem: horario.dia,
                    hor_abt: validateTime(horario.abertura),
                    hor_fch: validateTime(horario.fechamento),
                    hor_meiodia: !!horario.meiodia, // Convert to boolean
                    hor_aberto: horario.aberto,
                    hor_emp: novaEmpresa.emp_cod
                }, { transaction: t })
            )

            const horariosRegistrados = await Promise.all(horariosPromises)

            return {
                empresa: novaEmpresa,
                email: novoEmail,
                telefone: novoTelefone,
                endereco: novoEndereco,
                horarios: horariosRegistrados
            }
        })

        return res.status(201).json({
            message: 'Empresa cadastrada com sucesso',
            data: result
        })

    } catch (error) {
        console.error('Erro ao cadastrar empresa:', error)
        return res.status(500).json({
            error: 'Erro ao cadastrar empresa',
            details: error.message
        })
    }
}

module.exports = {
    cadastrarEmpresa
}