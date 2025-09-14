const historico = require('../models/viewHistorico')

exports.listagem = async (req, res) => {
    try{
        const visualizar = await historico.findAll();
        res.json(visualizar);
    }catch(error){
        res.status(500).send('Erro ao buscar o historico ' + error)
    }
}   