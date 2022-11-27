const express = require('express')
const controller = express.Router()
let products = require('../data/simulated_database')


//POST - CREATE - SKAPA EN ANVÄNDARE - SKICKA INFORMATION DOLT 
//GET - READ - HÄR HÄMTAR VI ALLA ANVÄNDARE - SYNLIG DATA I URL:en 


controller.param ("id", (req, res, next, id) => {
    req.products = products.find(products => products.id == id)
    next()
})

// http://localhost:5000/api/users/

controller.route('/')
.post((httpRequest, httpResponse) => {
    let products = {
        id: (products[products.length -1])?.id > 0? (products[products.length -1])?.id + 1 : 1,
            articleNumber: httpRequest.body.articleNumber,
            category: httpRequest.body.category,
            imageURL: httpRequest.body.imageURL, 
            title: httpRequest.body.title, 
            description: httpRequest.body.description, 
            price: httpRequest.body.price 
           
    }

    products.push(products)
    httpResponse.status(201).json(products)
})


.get((httpRequest, httpResponse) => {

    httpResponse.status(200).json(products)

})


// http://localhost:5000/api/users/1

controller.route("/:id")
.get((httpRequest, httpResponse) => {
    if (httpRequest.products != undefined)
        httpResponse.status(200).json(httpRequest.products)
    else
        httpResponse.status(404).json  
})

.put((httpRequest, httpResponse) => {
    if (httpRequest.products != undefined) {
        products.forEach(products => {
          if (products.id == httpRequest.products.id) {
             products.category = httpRequest.body.category? httpRequest.body.category : products.category
             products.imageURL = httpRequest.body.imageURL ? httpRequest.body.title : products.imageURL
             products.title = httpRequest.body.title ? httpRequest.body.title : products.title
             products.description = httpRequest.body.description ? httpRequest.body.description : products.description
             products.price = httpRequest.body.price ? httpRequest.body.price : products.price

            } 
        })     
        httpResponse.status(200).json(httpRequest.products)
    }
    else
        httpResponse.status(404).json() 

})

.delete((httpRequest, httpResponse) => {
    if (httpRequest.products != undefined) {
        products = products.filter(products => products.id !== httpRequest.products.id)
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json  
})




module.exports = controller