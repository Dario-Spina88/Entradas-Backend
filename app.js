const express = require ("express")
const ProductManager = require ("./ProductManager")

const app = express()
const product = new ProductManager("./entradas.json")

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) =>{
    res.status(200).send('<h1>Bienvenidos</h1>')
})

app.get("/productos", async (req,res)=>{
    try {
        const { limit } = req.query
        const products = await product.getProducts()
        if(!limit) {
            return res.send({
                status: 'success',
                data: products
            })
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })

    } catch (error) {
        console.log(error)   
    }
})

app.get("/productos/:id", async (req, res)=>{
    try {
        const {id} = req.params
        const productDb = await product.getProductById(parseInt(id))
        if (!productDb){
            return res.send({status: 'error', error: 'Product not found'})
        }
        res.send({productDb})
    } catch (error) {
        console.log(error)   
    }
})


app.listen(8080, ()=>{
    console.log('escuchando el puerto 8080')
})