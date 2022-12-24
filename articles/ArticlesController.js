const express = require("express")
const router = express.Router()
const Article = require("../articles/models/Article")
const slugify = require("slugify")
const Category = require("../categories/models/Category")


//ROTAS ARTICLES
router.get("/admin/articles", (req, res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles", {
            articles: articles
        })
    })
})

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        })
    })
})

router.post("/articles/save", (req,res) =>{
    const {title, body, category} = req.body


    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})

router.post("/admin/articles/delete", (req, res) => {
    const id = req.body.id
    if(!isNaN(id)){
        Article.destroy({
            where: {id: id}
        }).then(()=>{
            res.redirect("/admin/articles")
        })
    } else {
        res.redirect("/admin/articles")
    }
})

module.exports = router