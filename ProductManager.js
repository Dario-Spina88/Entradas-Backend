const express = require ("express")

const fs = require('fs')

class ProductManager{
    constructor(){
        this.products = []
        this.path = './entradas.json'
    }

    appendProduct = async () => {
        const productJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productJSON)
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const product = {
        title, 
        description, 
        price, 
        thumbnail, 
        code, 
        stock,
        }

        if(this.products.length === 0){
            product.id = 1
        }
        else{
            product.id = this.products[this.products.length - 1].id + 1
        }
        
        if (Object.values(product).every(obj => obj)){
            this.products.push(product)
            this.appendProduct()
        }else{
            return console.log("completar todos los campos")
        }
        
    }

    getProducts = async () => {
        try{            
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            console.log(getFileProducts)

        } catch(error){
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try{
            const getFileProduct = await fs.promises.readFile(this.path, 'utf-8')
            const product = JSON.parse(getFileProduct)
            console.log(product[id-1]);
        }
        catch(error){
            console.log(error);
        }
    }

    updateProduct = async (id, obj) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(getFileProducts)

            const retornaObj = Object.assign(products[id-1], obj)
            console.log(products[id-1])
            this.products = products
            this.appendProduct()

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(getFileProducts)

            console.log(products.splice(id-1,1), 'Entrada eliminada')
            this.products = products
            this.appendProduct()

        } catch (error) {
            console.log(error)
        }
    }

}

const instancia = new ProductManager();

instancia.addProduct('Recital Rock', 'Divididos', 7500, 'Link', 1, 6)
instancia.addProduct('Recital Rock', 'Las Pelotas', 8000, 'Link', 2, 4)
instancia.addProduct('Recital Rock', 'Fito Paez', 7000, 'Link', 3, 6)
instancia.addProduct('Recital Reagge', 'Los Cafres', 5000, 'Link', 4, 4)
instancia.addProduct('Recital Reagge', 'Nonpalidece', 4500, 'Link', 5, 4)
instancia.addProduct('Festival Electronica', 'Hernan Cattaneo', 10000, 'Link', 6, 2)
instancia.addProduct('Festival Electronica', 'Moonpark', 20000, 'Link', 7, 10)
instancia.addProduct('Recital Cumbia', 'Damas Gratis', 3000, 'Link', 8, 8)
instancia.addProduct('Recital Cumbia', 'La Nueva Luna', 3500, 'Link', 9, 4)
instancia.addProduct('Recital Cumbia', 'Jambao', 3000, 'Link', 10, 6)


// instancia.appendProduct()

// instancia.getProducts();


instancia.getProductById();

// instancia.updateProduct(2,{"price": 7500, "stock": 2}); 

// instancia.deleteProduct(1)

module.exports = ProductManager;