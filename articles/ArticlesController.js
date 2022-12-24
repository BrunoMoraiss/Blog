const express = require("express")
const router = express.Router()
const Article = require("../articles/models/Article")
const slugify = require("slugify")
const Category = require("../categories/models/Category")

//ROTAS ARTICLES

router.get("/admin/articles", (req, res)=>{
    res.render("admin/articles")
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

module.exports = router