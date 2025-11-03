const { 
    empresas,
    emails_empresas,
    telefones_empresas,
    enderecos,
    horarios_funcionamento,
    sequelize
} = require('../models/emp_info/relationships_empresas')

const { usuario } = require('../models/usr_info/relationships')

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

// Função de cadastro da empresa

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

//Buscar todas empresas

async function buscaTodas(req, res) {
    try{
        const encontrarTodas = await empresas.findAll({
            include: [
                {
                    model: telefones_empresas,
                    as: 'telefone_empresa',
                    attributes: ['tel_emp_num']
                },
                {
                    model: horarios_funcionamento,
                    as: 'horario_de_funcionamento',
                    attributes: ['hor_sem', 'hor_abt', 'hor_fch', 'hor_meiodia', 'hor_aberto']
                },
                {
                    model: usuario,
                    as: 'empresa_usuario',
                    attributes: ['usr_cod', 'usr_nom']
                }
            ]
        })

        const empresasFormatadas = encontrarTodas.map(empresa => ({
            empresa: {
                codigo: empresa.emp_cod,
                nome: empresa.emp_nom,
                categoria: empresa.emp_cat,
                descricao: empresa.emp_dsc,
                telefone: empresa.telefone_empresa?.tel_emp_num,
                horarios: empresa.horario_de_funcionamento?.map(horario => ({
                    dia: horario.hor_sem,
                    aberto: horario.hor_aberto,
                    horario_abertura: horario.hor_abt,
                    horario_fechamento: horario.hor_fch,
                    fecha_meio_dia: horario.hor_meiodia
                })),
                usuario: {
                    codigo: empresa.empresa_usuario?.usr_cod,
                    nome: empresa.empresa_usuario?.usr_nom
                }
            }
        }));

        return res.status(200).json(empresasFormatadas)
    }catch(error){
        console.error('Erro ao buscar empresas:', error);
        return res.status(500).json({
            error: 'Erro ao buscar empresas',
            details: error.message
        });
    }
}

//Função de busca de empresa por usuario

async function buscaEmpresa(req, res) {
    const { usr_cod } = req.params;

    if (!usr_cod) {
        return res.status(400).json({
            error: 'Código do usuário é obrigatório'
        });
    }

    try {
        const empresasEncontradas = await empresas.findAll({
            where: {
                emp_usr: usr_cod,
                emp_atv: true
            },
            attributes: ['emp_cod', 'emp_nom', 'emp_cat', 'emp_dsc'],
            include: [
                {
                    model: telefones_empresas,
                    as: 'telefone_empresa',
                    attributes: ['tel_emp_num']
                },
                {
                    model: horarios_funcionamento,
                    as: 'horario_de_funcionamento',
                    attributes: ['hor_sem', 'hor_abt', 'hor_fch', 'hor_meiodia', 'hor_aberto']
                },
                {
                    model: usuario,
                    as: 'empresa_usuario',
                    attributes: ['usr_cod', 'usr_nom']
                }
            ]
        });

        if (!empresasEncontradas || empresasEncontradas.length === 0) {
            return res.status(404).json({
                message: 'Nenhuma empresa encontrada para este usuário'
            });
        }

        // Formata a resposta
        const empresasFormatadas = empresasEncontradas.map(empresa => ({
            empresa: {
                codigo: empresa.emp_cod,
                nome: empresa.emp_nom,
                categoria: empresa.emp_cat,
                descricao: empresa.emp_dsc,
                telefone: empresa.telefone_empresa?.tel_emp_num,
                horarios: empresa.horario_de_funcionamento?.map(horario => ({
                    dia: horario.hor_sem,
                    aberto: horario.hor_aberto,
                    horario_abertura: horario.hor_abt,
                    horario_fechamento: horario.hor_fch,
                    fecha_meio_dia: horario.hor_meiodia
                })),
                usuario: {
                    codigo: empresa.empresa_usuario?.usr_cod,
                    nome: empresa.empresa_usuario?.usr_nom
                }
            }
        }));

        return res.status(200).json(empresasFormatadas);

    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        return res.status(500).json({
            error: 'Erro ao buscar empresas',
            details: error.message
        });
    }
}

// Busca por categoria

async function buscaEmpresaCat(req, res) {
    const { emp_cat } = req.params;

    if (!emp_cat) {
        return res.status(400).json({
            error: 'Categoria da empresa é obrigatório'
        });
    }

    try{
        const empresasEncontradas = await empresas.findAll({
            where: {
                emp_cat: emp_cat,
                emp_atv: true
            },
            attributes: ['emp_cod', 'emp_nom', 'emp_cat', 'emp_dsc'],
            include: [
                {
                    model: telefones_empresas,
                    as: 'telefone_empresa',
                    attributes: ['tel_emp_num']
                },
                {
                    model: horarios_funcionamento,
                    as: 'horario_de_funcionamento',
                    attributes: ['hor_sem', 'hor_abt', 'hor_fch', 'hor_meiodia', 'hor_aberto']
                },
                {
                    model: usuario,
                    as: 'empresa_usuario',
                    attributes: ['usr_cod', 'usr_nom']
                }
            ]
        });

        if (!empresasEncontradas || empresasEncontradas.length === 0) {
            return res.status(404).json({
                message: 'Nenhuma empresa encontrada com essa categoria'
            });
        }

        const empresasFormatadas = empresasEncontradas.map(empresa => ({
            empresa: {
                codigo: empresa.emp_cod,
                nome: empresa.emp_nom,
                categoria: empresa.emp_cat,
                descricao: empresa.emp_dsc,
                telefone: empresa.telefone_empresa?.tel_emp_num,
                horarios: empresa.horario_de_funcionamento?.map(horario => ({
                    dia: horario.hor_sem,
                    aberto: horario.hor_aberto,
                    horario_abertura: horario.hor_abt,
                    horario_fechamento: horario.hor_fch,
                    fecha_meio_dia: horario.hor_meiodia
                })),
                usuario: {
                    codigo: empresa.empresa_usuario?.usr_cod,
                    nome: empresa.empresa_usuario?.usr_nom
                }
            }
        }));

        return res.status(200).json(empresasFormatadas);

    }catch(err){
        console.error('Erro ao buscar empresas:', error);
        return res.status(500).json({
            error: 'Erro ao buscar empresas',
            details: error.message
        });
    }
}


module.exports = {
    buscaEmpresa,
    cadastrarEmpresa,
    buscaEmpresaCat,
    buscaTodas
}