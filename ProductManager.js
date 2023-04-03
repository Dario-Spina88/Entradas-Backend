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
            return JSON.parse(getFileProducts)

        } catch(error){
            return []
        }
    }

    getProductById = async (id) => {
        try{
            const getFileProduct = await fs.promises.readFile(this.path, 'utf-8')
            const productParse = JSON.parse(getFileProduct)
            if (!productParse[id - 1]) return 'error, no existe el producto'
            return productParse[id - 1]
        }
        catch(error){
            return error
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


module.exports = ProductManager;