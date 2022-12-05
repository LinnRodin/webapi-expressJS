const express = require('express')
const controller = express.Router()
let products = require('../data/simulated_database')


//POST - CREATE - SKAPA - SKICKA INFORMATION DOLT 
//GET - READ - HÄR HÄMTAR VI ALLT - SYNLIG DATA I URL:en 


controller.param ("id", (req, res, next, id) => {
    req.product = products.find(product => product.id == id)
    next()
})

// http://localhost:5000/api/products/

controller.route('/')
.post((httpRequest, httpResponse) => {
    let product = {
        articleNumber: (products[products.length -1])?.articleNumber > 0? (products[products.length -1])?.articleNumber + 1 : 1,
        category: httpRequest.body.category,
        imageURL: httpRequest.body.imageURL, 
        title: httpRequest.body.title, 
        description: httpRequest.body.description, 
        price: httpRequest.body.price 
        
    }

    products.push(product)
    httpResponse.status(201).json(product)
})


.get((httpRequest, httpResponse) => {

    httpResponse.status(200).json(products)

})


// http://localhost:5000/api/products/1

controller.route("/:id")
.get((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined)
        httpResponse.status(200).json(httpRequest.product)
    else
        httpResponse.status(404).json  
})

.put((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined) {
        products.forEach(product => {
          if (product.articleNumber == httpRequest.product.id) {
             product.category = httpRequest.body.category? httpRequest.body.category : product.category
             product.imageURL = httpRequest.body.imageURL ? httpRequest.body.title : product.imageURL
             product.title = httpRequest.body.title ? httpRequest.body.title : product.title
             product.description = httpRequest.body.description ? httpRequest.body.description : product.description
             product.price = httpRequest.body.price ? httpRequest.body.price : product.price

            } 
        })     
        httpResponse.status(200).json(httpRequest.product)
    }
    else
        httpResponse.status(404).json() 

})

.delete((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined) {
        products = products.filter(product => product.articleNumber !== httpRequest.product.id)
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json  
})




module.exports = controller