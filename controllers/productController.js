const express = require('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchema')


// unsecured routes 

//hämtar upp alla produkter

controller.route('/').get(async (req,res) => {
    try{
        res.status(200).json(await productSchema.find())
    } catch {
        res.status(400).json()
    }

})

//hämtar upp alla tag:ar

controller.route('/:tag').get(async (req, res) => {
    const products = await productSchema.find({ tag: req.params.tag })
    if(products)
       res.status(200).json(products)
    else
       res.status(400).json()
})


//sorterar på hur många produkter vi vill hämta upp

controller.route('/:tag/:take').get(async(req,res) => {
    const products = await productSchema.find({ tag: req.params.tag }).limit(req.params.take)
    if(products)
        res.status(200).json(products)
    else
        res.status(400).json()
})




//hämtar upp baserat på ett articleNumber eller id


controller.route('/product/details/:articleNumber').get(async(req,res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if(product)
       res.status(200).json(product)
    else
       res.status(404).json()

})


// secured routes




module.exports = controller