const express = require("express")
const router = express.Router()
const Article = require("../articles/models/Article")
const Category = require("../categories/models/Category")

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        })
    })
})

module.exports = router