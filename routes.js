//Requires do sistema

//Express
  const express = require('express')

//Router do express
  const router = express.Router()

//Path
  const path = require('path')

//Rota padrão, por enquanto nada nela
  router.get('/', (req, res) => {
    res.send('Hello, World!')
  })

//Pagina de login, a rota é about e o arquivo é landpage pqp KKKKKKKKKKKKKKKKKKKKKKKKKKK
  router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'html', 'landPage.html'))
  })

//Imagem 404 quando uma rota não é encontrada
  router.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
  })

module.exports = router