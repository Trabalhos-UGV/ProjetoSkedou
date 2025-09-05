const express = require("express");
const app = express();
const port = 3000;
const router = require("../routes");
const sequelize = require('../src/db/cnx')

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Projeto iniciado na porta: ${port}`);
});

async function connectionTest() {
  try {
  await sequelize.authenticate();
  console.log("Conexão com ORM sequelize bem sucedida.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
} 
}

connectionTest();