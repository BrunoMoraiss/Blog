const Sequeliize = require("sequelize")
const connection = require("../../database/database")

const Category = connection.define('categories', {
    title: {
        type: Sequeliize.STRING,
        allowNull: false
    }, slug: {
        type: Sequeliize.STRING,
        allowNull: false
    }
})

module.exports = Category