const express = require('express')
const router = express.Router()
const path = require('path')
const listagem = require('./src/db/consultas')

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'landpage.html'))
})

router.get('/person/client/home', (req, res) => {
  res.send('Página de chegada do cliente')
})

router.get('/a', async(req, res) =>{
  try{
    res.json(await listagem())
  }catch(error){
    res.status(500).send('não foi possível estabelecer comunicação com o banco de dados ' + error)
  }
})

router.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
})

module.exports = router