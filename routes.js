const express = require('express')
const router = express.Router()
const path = require('path')
const clientes = require('./controllers/clientesController')


router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/cli', clientes.listarClientes);
router.get('/cli/:cli_cod', clientes.buscarCliente);
router.post('/cli', clientes.criarCliente);
router.put('/cli/:cli_cod', clientes.attCliente);
router.delete('/cli/:cli_cod', clientes.delCliente);

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'landPage.html'))
})

router.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
})

module.exports = router