const express = require("express")
const router = express.Router()
//Importando o model Category
const Category = require("./models/Category")
//Importando biblioteca slugify
const slugify = require("slugify")
//Importando middleware de autenticação
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new")
})

router.post("/categories/save", adminAuth, (req, res) => {
    const title = req.body.title
    if(title !== ""){
        Category.create({
            title: title,
            slug: slugify(title)
        }) 
        res.redirect("/admin/categories")
    } else {
        res.redirect("admin/categories/new")
    }
})

router.get("/admin/categories", adminAuth, (req, res) => {
    Category.findAll({
        raw: true
    }).then(category => {
        res.render("admin/categories/index", {
            category: category
        })
    })
})

router.post("/admin/categories/delete", adminAuth, (req, res) => {
    const id = req.body.id
    if(!isNaN(id)){
        Category.destroy({
            where: {id: id}
        }).then(()=>{
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    const id = Number(req.params.id)

    if(isNaN(id)){
        return res.redirect("/admin/categories")
    }

    Category.findByPk(id).then(category => {
        if(category !== null){
            res.render("admin/categories/edit", {
            category: category
            })
        } else {
            res.redirect("/admin/categories")
        } 
    }).catch(()=>{
        res.redirect("/admin/categories")
    })
})

router.post("/categories/update", adminAuth, (req, res) => {
    const id = Number(req.body.id)
    const title = req.body.title

    Category.update({title: title, slug: slugify(title)}, {
        where: {id: id}
    }).then(()=>{
        res.redirect("/admin/categories")
    })
})


module.exports = router