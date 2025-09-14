const historico = require('../models/viewHistorico')

//select da view preco_lista, puxa todas as informações
exports.listagem = async (req, res) => {
    try{
        const visualizar = await historico.findAll();
        res.json(visualizar);
    }catch(error){
        res.status(500).send('Erro ao buscar o historico ' + error)
    }
}   