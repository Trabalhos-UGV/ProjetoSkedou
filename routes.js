//Requires do sistema

  //Express
    const express = require('express')

  //Router do express
    const router = express.Router()

//Requires dos controllers

  //Usuário
    const usuariosController = require('./controllers/usuariosController')

  //Empresas
    const empresasController = require('./controllers/empresasController')

//Rota padrão, mostra as rotas de api
  router.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html')
  })

//Rota de cadastro do usuário
  router.post('/api/usuarios/cadastro', usuariosController.cadastrarUsuario)
  router.post('/api/usuarios/login', usuariosController.loginUsuario)

//Rota de cadastro da empresa
  router.post('/api/empresas/cadastro', empresasController.cadastrarEmpresa)

//Imagem 404 quando uma rota não é encontrada
  router.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
  })

module.exports = router