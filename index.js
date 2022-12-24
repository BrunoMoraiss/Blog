const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
//Importando Rotas
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
//Importando models (Article e Category)
const Article = require("./articles/models/Article")
const Category = require("./categories/models/Category")

//View Engine
app.set('view engine', 'ejs')

//Implementação body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Static
app.use(express.static('public'))

//Conectando ao database
connection.authenticate().then(() => {
    console.log("Conectado ao banco de dados!")
}).catch((error) => {
    console.log(error)
})

//Conectando ao categoriesController (Rotas)
app.use(categoriesController)

//Conectando ao articlesController (Rotas)
app.use(articlesController)

//Rota pagina principal
app.get("/", (req, res) => {
    Article.findAll().then(articles => {
        res.render('index', {
            articles: articles
        })
    })
})

app.get("/:slug", (req, res) => {
    const slug = req.params.slug

    Article.findOne({
        where: {slug: slug}
    }).then(article => {
        console.log(article)
        res.render("article", {article: article})
    })
})
    

//Iniciando o servidor na porta 3000
app.listen(3000, console.log("Servidor iniciado!"))