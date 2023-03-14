let getProducts = [];

class ProductManager{
    constructor(title, description,price,thumbnail,code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = 111
        this.stock = stock
    }

    static productCode = 111 

    agregarId (){
        this.code++
        ProductManager.productCode++

    }

    getProducts(){
        
    }

    getProductById(){
        // if("No se encontro la entrada")
    }
}

const productManager = new ProductManager('Recital Rock', 'Divididos', '$7500', 'img', 'A999','6')
console.log(productManager.title)
console.log(productManager.description)
console.log(productManager.price)
console.log(productManager.thumbnail)
console.log(productManager.code)
console.log(productManager.stock)

const productManager2 = new ProductManager('Recital cumbia', 'Damas Gratis', '$4500', 'img', 'B888','4')
console.log(productManager2.title)
console.log(productManager2.description)
console.log(productManager2.price)
console.log(productManager2.thumbnail)
console.log(productManager2.code)
console.log(productManager2.stock)

const productManager3 = new ProductManager('Festival Reagge', 'Los Cafres', '$5000', 'img', 'C555','2')
console.log(productManager3.title)
console.log(productManager3.description)
console.log(productManager3.price)
console.log(productManager3.thumbnail)
console.log(productManager3.code)
console.log(productManager3.stock)

const productManager4 = new ProductManager('Electronica', 'Hernan Cattaneo', '$10000', 'img', 'D666','4')
console.log(productManager4.title)
console.log(productManager4.description)
console.log(productManager4.price)
console.log(productManager4.thumbnail)
console.log(productManager4.code)
console.log(productManager4.stock)


productManager.agregarId()

console.log(ProductManager.productCode)