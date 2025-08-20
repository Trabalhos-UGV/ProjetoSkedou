const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'landpage.html'))
})

router.get('/person/client/home', (req, res) => {
  res.send('Página de chegada do cliente')
})

router.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
})

module.exports = router