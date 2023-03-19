let productos = [];

class ProductManager{
    constructor(){
        this.products = productos
    }

    addProduct (newPorduct){

        if (!newPorduct.title || 
            !newPorduct.description || 
            !newPorduct.price || 
            !newPorduct.thumbnail || 
            !newPorduct.code || 
            !newPorduct.stock) return 'completar todos los campos'

            let product = this.products.find(prod => prod.code === newPorduct.code)
            if(product) return 'Ya fue ingresado con este codigo'

            if(this.products.length === 0){
                return this.products.push({id: 1, ...newPorduct})
            }

        return [ ...this.products, {id: this.products[this.products.length-1].id + 1 , ...newPorduct}]
        
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        let product = this.products.find(prod => prod.id === id)
        if (!product) return 'Not Found'
        return product
    }
}

const product = new ProductManager()

product.addProduct({title:'Producto'})

product.addProduct({
    title: 'Recital Rock',
    description: 'Divididos',
    price: 7500,
    thumbnail: 'Link',
    code: 111,
    stock: 6
})

// aplica que ya ingreso este producto

console.log(
    product.addProduct({
        title: 'Festival Reagge',
        description: 'Los Cafres',
        price: 5000,
        thumbnail: 'Link',
        code: 222,
        stock: 4
    })
    )

    console.log(
        product.addProduct({
            title: 'Festival Reagge',
            description: 'Los Cafres',
            price: 5000,
            thumbnail: 'Link',
            code: 222,
            stock: 4
        })
        )

product.addProduct({
    title: 'Electronica',
    description: 'Hernan Cattaneo',
    price: 10000,
    thumbnail: 'Link',
    code: 333,
    stock: 2
})

console.log(product.getProducts())

// no esta este producto
console.log(product.getProductById(4))
