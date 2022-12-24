const Sequeliize = require("sequelize")
const connection = require("../../database/database")
const Category = require("../../categories/models/Category")

const Article = connection.define("articles", {
    title: {
        type: Sequeliize.STRING,
        allowNull: false
    }, slug: {
        type: Sequeliize.STRING,
        allowNull: false
    }, body:{
        type: Sequeliize.STRING,
        allowNull: false
    }
})

//Criando um relacionamento
Category.hasMany(Article) //Uma categoria para varios artigos
Article.belongsTo(Category) // Um artigo para uma catgoria 

module.exports = Article