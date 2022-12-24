const Sequeliize = require("sequelize")

const connection = new Sequeliize('guiapress', 'root', '56157469', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false //Para não aparecer mensagens no console.log
})

module.exports = connection;