const { 
    servicos,
    empresas, 
    sequelize 
} = require('../models/agn_info/relationshipsAgen')

// Cadastrar serviço
async function cadastrarServico(req, res) {
    const { 
        sev_nom, 
        sev_prc, 
        sev_dsc, 
        sev_emp, 
        sev_dur 
    } = req.body

    if (!sev_nom || sev_prc === undefined || sev_emp === undefined || sev_dur === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios: sev_nom, sev_prc, sev_emp, sev_dur' })
    }

    try {
        const novoServico = await sequelize.transaction(async (t) => {
            const empresa = await empresas.findByPk(sev_emp, { transaction: t })
            if (!empresa) throw new Error('Empresa não encontrada')

            const criado = await servicos.create({
                sev_nom,
                sev_prc,
                sev_dsc: sev_dsc || ' ',
                sev_emp,
                sev_dur
            }, { transaction: t })

            return criado
        })

        return res.status(201).json({ message: 'Serviço cadastrado', data: novoServico })
    } catch (error) {
        console.error(error)
        if (error.message === 'Empresa não encontrada') {
            return res.status(404).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Erro ao cadastrar serviço', details: error.message })
    }
}

// Listar serviços por código da empresa
async function listarServicosPorEmpresa(req, res) {
    const { emp_cod } = req.params
    if (!emp_cod) return res.status(400).json({ error: 'Parâmetro emp_cod é obrigatório' })

    try {
        const lista = await servicos.findAll({
            where: { sev_emp: emp_cod },
            attributes: ['sev_cod', 'sev_nom', 'sev_prc', 'sev_dsc', 'sev_dur', 'sev_emp']
        })

        return res.status(200).json(lista)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao listar serviços', details: error.message })
    }
}

module.exports = {
    cadastrarServico,
    listarServicosPorEmpresa
}