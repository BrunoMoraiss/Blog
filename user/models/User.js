const Sequeliize = require("sequelize")
const connection = require("../../database/database")

const User = connection.define('users', {
    email: {
        type: Sequeliize.STRING,
        allowNull: false
    }, password: {
        type: Sequeliize.STRING,
        allowNull: false
    }
})

User.sync({force: false})

module.exports = User