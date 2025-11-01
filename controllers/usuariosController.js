const { sequelize, usuario, emails, telefones } = require('../models/usr_info/relationships')

async function cadastrarUsuario(req, res) {
    // Extrai dados do body
    const { usr_nom, eml_end, tel_num, usr_cpfcnpj, usr_sen } = req.body

    // Validação básica
    if (!usr_nom || !eml_end || !tel_num || !usr_cpfcnpj || !usr_sen) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios'
        })
    }

    try {
        // Inicia transaction
        const result = await sequelize.transaction(async (t) => {
            // Cria email
            const novoEmail = await emails.create({
                eml_end: eml_end
            }, { transaction: t })

            // Cria telefone
            const novoTelefone = await telefones.create({
                tel_num: tel_num
            }, { transaction: t })

            // Cria usuário com as referências
            const novoUsuario = await usuario.create({
                usr_nom: usr_nom,
                usr_eml: novoEmail.eml_cod,
                usr_tel: novoTelefone.tel_cod,
                usr_cpfcnpj: usr_cpfcnpj,
                usr_sen: usr_sen,
                usr_atv: true
            }, { transaction: t })

            return {
                usuario: novoUsuario,
                email: novoEmail,
                telefone: novoTelefone
            }
        })

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            data: result
        })

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        return res.status(500).json({
            error: 'Erro ao cadastrar usuário',
            details: error.message
        })
    }
}

async function loginUsuario(req, res) {
    const { eml_end, usr_sen } = req.body

    if (!eml_end || !usr_sen) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    try {
        const usuarioEncontrado = await usuario.findOne({
            include: [
                { model: emails, as: 'email', where: { eml_end }, attributes: ['eml_cod', 'eml_end'] },
                { model: telefones, as: 'telefone', attributes: ['tel_cod', 'tel_num'] }
            ],
            attributes: ['usr_cod', 'usr_nom', 'usr_cpfcnpj', 'usr_sen', 'usr_atv', 'usr_eml', 'usr_tel']
        })

        if (!usuarioEncontrado) {
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }

        const senhaSalva = usuarioEncontrado.get('usr_sen')
        if (usr_sen !== senhaSalva) {
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }

        const resp = {
            usr_cod: usuarioEncontrado.get('usr_cod'),
            usr_nom: usuarioEncontrado.get('usr_nom'),
            usr_cpfcnpj: usuarioEncontrado.get('usr_cpfcnpj'),
            usr_atv: usuarioEncontrado.get('usr_atv'),
            email: usuarioEncontrado.email ? {
                eml_cod: usuarioEncontrado.email.eml_cod,
                eml_end: usuarioEncontrado.email.eml_end
            } : null,
            telefone: usuarioEncontrado.telefone ? {
                tel_cod: usuarioEncontrado.telefone.tel_cod,
                tel_num: usuarioEncontrado.telefone.tel_num
            } : null
        }

        return res.status(200).json({ usuario: resp })

    } catch (error) {
        console.error('Erro no login:', error)
        return res.status(500).json({ error: 'Erro no servidor', details: error.message })
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario
}