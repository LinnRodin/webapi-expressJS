const express = require('express')
const controller = express.Router()
const productSchema = require('../schemas/productSchema')


// unsecured routes 

//hämtar upp alla produkter, lägger in ett nytt objekt i listan

controller.route('/').get(async (req,res) => {
    const products = []
    const list = await productSchema.find()
    if(list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageURL: product.imageURL,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

//hämtar upp alla tag:ar

controller.route('/:tag').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag })
    if(list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageURL: product.imageURL,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})


//sorterar på hur många produkter vi vill hämta upp

controller.route('/:tag/:take').get(async(req,res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag }).limit(req.params.take)
    if(list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageURL: product.imageURL,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})




//hämtar upp baserat på ett articleNumber eller id


controller.route('/product/details/:articleNumber').get(async(req,res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if(product) {                
        res.status(200).json({
            articleNumber: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            tag: product.tag,
            imageURL: product.imageURL,
            rating: product.rating
        })
    } else
        res.status(404).json()
})


// secured routes




module.exports = controller