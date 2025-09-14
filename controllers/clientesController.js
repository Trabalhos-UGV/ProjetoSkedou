const clientes = require('../models/clientes')


//Select da tabela clientes
exports.listarClientes = async (req, res) => {
    try{
        const visualizar = await clientes.findAll();
        res.json(visualizar);
    }catch(error){
        res.status(500).send('Erro ao buscar o historico ' + error)
    }
}   

//Select por cli_cod na tabela clientes (busca pelo parametro ex: http://localhost:3000/cli/2)
exports.buscarCliente = async (req,res) => {
    try{
        const buscar = await clientes.findByPk(req.params.cli_cod)
        if (buscar) res.json(buscar);
        else res.status(404).send('Cliente não encontrado')
    }catch(error){
        res.status(500).send('Erro ao buscar cliente')
    }
}

//Insert de cliente na tabela (pega informações no body)
exports.criarCliente = async (req, res) => {
    try{
        const novoCliente = await clientes.create({cli_usr: req.body.cli_usr,cli_nom: req.body.cli_nom})
        res.status(201).json(novoCliente);
    }catch(error){
        res.status(400).send({erro: error.message})
    }
}


//Update de cliente na tabela (pega informações no body (busca pelo parametro ex: http://localhost:3000/cli/2))
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

//Delete de cliente na tabela (busca pelo parametro ex: http://localhost:3000/cli/2)
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