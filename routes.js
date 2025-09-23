//Requires do sistema

//Express
const express = require('express')
//Router do express
const router = express.Router()
//Path
const path = require('path')
//Controller do model clientes
const clientes = require('./controllers/clientesController')
//Controller do model viewhistorico
const historico = require('./controllers/historicoController')

//Rota padrão, por enquanto nada nela
router.get('/', (req, res) => {
  res.send('Hello, World!')
})

//CRUD na tabela clientes do banco de dados

//pega todos os clientes
router.get('/cli', clientes.listarClientes);

//pega o cliente especificado pelo parametro
router.get('/cli/:cli_cod', clientes.buscarCliente);

//insere um cliente com as informações do body
router.post('/cli', clientes.criarCliente);

//atualiza o cliente especificado no parametro com as informações do body
router.put('/cli/:cli_cod', clientes.attCliente);

//deleta o cliente especificado no parametro
router.delete('/cli/:cli_cod', clientes.delCliente);


//API das informações da view preco_lista
router.get('/h', historico.listagem);

//Pagina de login, a rota é about e o arquivo é landpage pqp KKKKKKKKKKKKKKKKKKKKKKKKKKK
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'landPage.html'))
})

//Tabela html com as informações da tabela clientes
router.get('/torma', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'Torma.html'))
})

//Tabela html com as informações da view preco lista
router.get('/hist', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'view.html'))
})

//Teste
router.get('/clipost', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'teste.html'))
})

//Imagem 404 quando uma rota não é encontrada
router.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
})

module.exports = router