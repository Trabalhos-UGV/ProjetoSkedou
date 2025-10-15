const empresa = require ('../models/empresas')

exports.postEmp = async (req, res) => {
    try{
        const novaEmp = await empresa.create(
            {
                emp_nom: req.body.emp_nom,
                emp_cnpj: req.body.emp_cnpj,
                emp_typ: req.body.emp_typ
            })
        res.status(201).json(novaEmp);
    }catch(erro){
        res.send('Não foi possivel incluir a empresa: ' + erro)
    }
} 