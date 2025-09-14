const clientes = require('../models/clientes')

exports.listarClientes = async (req, res) => {
    try{
        const visualizar = await clientes.findAll();
        res.json(visualizar);
    }catch(error){
        res.status(500).send('Erro ao buscar o historico ' + error)
    }
}   
    
exports.buscarCliente = async (req,res) => {
    try{
        const buscar = await clientes.findByPk(req.params.cli_cod)
        if (buscar) res.json(buscar);
        else res.status(404).send('Cliente não encontrado')
    }catch(error){
        res.status(500).send('Erro ao buscar cliente')
    }
}

exports.criarCliente = async (req, res) => {
    try{
        const novoCliente = await clientes.create({cli_usr: req.body.cli_usr,cli_nom: req.body.cli_nom})
        res.status(201).json(novoCliente);
    }catch(error){
        res.status(400).send({erro: error.message})
    }
}

exports.attCliente = async (req, res) => {
    try{
        const cliente = await clientes.findByPk(req.params.cli_cod)
        if(!cliente) return res.status(404).send('Cliente não encontrado');

        cliente.cli_nom = req.body.cli_nom;
        await cliente.save();
        res.json(cliente)
    }catch(error){
        res.status(500).send('Erro ao atualizar cliente ' + error.message)
    }
}

exports.delCliente = async (req, res) => {
    try{
        const deletar = await clientes.findByPk(req.params.cli_cod);
        if(!deletar) return res.status(404).send('Cliente não encontrado');

        await deletar.destroy();
        res.status(201).send('Cliente deletado com sucesso')
    }catch(error){
        res.status(500).send('Erro ao deletar o cliente' + error)
    }
}