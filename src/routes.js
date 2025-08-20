const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/home', (req, res) => {
  path.join(__dirname, 'views', 'landpage.html')
})


module.exports = router