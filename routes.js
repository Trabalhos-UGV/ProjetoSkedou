const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('./src/db/cnx')


router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'Torma.html'))
})

router.get('/a', async (req, res) => {
  let resultado = await db.query('SELECT * FROM preco_lista')
  res.json(resultado.rows)
})

/*  router.get('/a', async (req, res) => {
  try {
    let result = await db.query('SELECT * FROM preco_lista')
    let html = `<html>
    <head>
        <title>Tabela da view</title>
    </head>
    <body>
        <h1>Dados da view</h1>
        <table border="1" cellpadding="5">
            <tr>`;
    result.fields.forEach(field => {
      html +=
        `<th>${field.name}</th>
        <th>${field.name}</th>
        <th>${field.name}</th>
        <th>${field.name}</th>`
      result.rows.forEach(row => {
        html += `<tr>`
        result.fields.forEach(fields => {
          html += `<td>${row[field.name]}</td>`;
        })
        html+='</tr>';
      });
      html+=`</table>
      </body>
      </html>`
    });
    res.send(html)
  } catch (error) {
    res.status(500).send('não foi possível estabelecer comunicação com o banco de dados ' + error)
  }
})  */

router.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'images', 'notfound.png'))
})

module.exports = router