const { Sequelize } = require('sequelize');

//faz a conexão com o banco utilizando o sequelize
const sequelize = new Sequelize('Skedou', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

module.exports = sequelize; 