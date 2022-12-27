const express = require("express")
const router = express.Router()
const Article = require("../articles/models/Article")
const slugify = require("slugify")
const Category = require("../categories/models/Category")

//Importando middleware de autenticação
const adminAuth = require("../middlewares/adminAuth")

//ROTAS ARTICLES
router.get("/admin/articles", adminAuth ,(req, res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles", {
            articles: articles
        })
    })
})

router.get("/admin/articles/new", adminAuth ,(req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        })
    })
})

router.post("/articles/save", adminAuth ,(req,res) =>{
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

router.post("/admin/articles/delete", adminAuth, (req, res) => {
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

router.post("/admin/articles/edit/:id", adminAuth ,(req, res) => {
    const id = req.params.id

    Article.findOne({
        where: {id: id},
        include: [{model: Category}]
    }).then(article => {
        res.render("admin/articles/edit", {article: article, category: article.category})
    })
})

router.post("/articles/update", adminAuth, (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const id = Number(req.body.id)

    Article.update({title: title, slug: slugify(title) , body: body}, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles")
    }).catch((error) => {
        res.redirect("/")
    })
})

router.get("/articles/page/:num", (req, res) => {
    const page = req.params.num
    let offset = 0

    if(isNaN(page) || page == 1){
        offset = 0
    } else {
        offset = 4 * (parseInt(page) - 1)
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles =>{

        let next

        if(offset + 4 >= articles.count){
            next = false
        } else {
            next = true
        }

        let result = {
            next : next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {
                page: Number(page),
                result: result,
                categories: categories
            })
        })
    })
})



module.exports = router