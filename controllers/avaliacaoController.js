const {
    empresas,
    usuario,
    avaliacoes,
    sequelize
} = require('../models/emp_info/relationships_empresas')

async function criarAvaliacao(req, res) {
    const {
        usr_cod,
        emp_cod,
        ava_nota,
        ava_dsc
    } = req.body

    if (!usr_cod || !emp_cod || !ava_nota) {
        return res.status(400).json({ 
            error: 'Campos obrigatórios faltando' 
        })
    }

    try{
        const result = await sequelize.transaction(async (t) => {
            // Cria avaliação
            const novaAvaliacao = await avaliacoes.create
        })
    }catch(err){
        
    }
}