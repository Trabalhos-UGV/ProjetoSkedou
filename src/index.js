const express = require("express");
const app = express();
const port = 3000;
const router = require("../routes");
const sequelize = require('../src/db/cnx')
const cors = require('cors')

//permite a gente utilizar .json
app.use(express.json());

app.use(cors()) //pemite origin em todas as rotas

//permite a gente usar o arquivo routes para rotas
app.use(router);

//comunica no terminal (CMD) que o servidor local foi iniciado
app.listen(port, () => {
  console.log(`Projeto iniciado na porta: ${port}`);
});

//Testa a conexão com o ORM e comunica seu sucesso no terminal (CMD)
async function connectionTest() {
  try {
  await sequelize.authenticate();
  console.log("Conexão com ORM sequelize bem sucedida.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
} 
}

connectionTest();