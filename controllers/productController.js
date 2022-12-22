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


controller.route('/products/details/:articleNumber').get(async(req,res) => {
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


//Create product

controller.route('/').post(async(req, res) => {
    const { name, description, price, category, tag, imageURL, rating } = req.body
    
    if (!name || !price)
        res.status(400).json({text: 'name and price is required.'})
    
    const item_exists = await productSchema.findOne({name})
    if (item_exists)
        res.status(409).json({text: 'a product with the same name already exists.'})
    else {
        const product = await productSchema.create({
            name, 
            description,
            price,
            category,
            tag,
            imageURL,
            rating
        })
        if (product)
            res.status(201).json({text: `product with article number ${product._id} was created successfully.`})  
        else
            res.status(400).json({text: 'something went wrong when we tried to create the product.'})    
    }    
})


//Delete product

controller.route('/:articleNumber').delete(async(req, res) => {
    if (!req.params.articleNumber)
        res.status(400).json('no article number was specified.')

    else {
        const product = await productSchema.findById(req.params.articleNumber)
        if (product) {
            await productSchema.remove(product)
            res.status(200).json({text: `product with article number ${req.params.articleNumber} was deleted successfully.`})
        } else {
            res.status(404).json({text: `product with article number ${req.params.articleNumber} was not found.`})
        }
    }

})


//update product

controller.route('/:articleNumber').put(async(req, res) => {
    const { name, description, price, category, tag, imageURL, rating } = req.body
    const updatedProduct = ({ name, description, price, category, tag, imageURL, rating }) 

    const product_exists = await productSchema.findById(req.params.articleNumber)
    if (product_exists) {
        const updateProduct = await productSchema.updateOne({ _id: req.params.articleNumber }, updatedProduct)
        if(updateProduct)
           res.status(201).json({text: `product with article number ${req.params.articleNumber} was updated successfully.`})  
        else 
           res.status(400).json({text: 'something went wrong when we tried to update the product.'})  
              
    }
    return (updatedProduct)
})






module.exports = controller

