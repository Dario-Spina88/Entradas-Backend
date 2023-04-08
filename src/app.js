const express = require ("express")
const ProductManager = require ("./ProductManager")

const app = express()
let product = new ProductManager("./entradas.json")
product.getProducts()


//USE------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//GET-------------
app.get('/', (req, res) =>{
    res.status(200).send('<h1>Bienvenidos</h1>')
})

app.get("/products", async (req,res)=>{
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

app.get("/products/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const productDb = await product.getProductById(parseInt(req.params.pid))
        if (!productDb){
            return res.send({status: 'error', error: 'Product not found'})
        }
        res.send({productDb})
    } catch (error) {
        console.log(error)   
    }
})

// POST--------------
app.post("/products", async (req, res)=>{
    let entrada = req.body
    let products = await product.addProduct(entrada.title, entrada.description)

    if(!entrada.title || !entrada.description) {
        return res.status(400).send({status:'error', mensaje: 'Llenar todos los campos'})
    }
    // product.push(entrada)
    res.status(200).send({product})
})

//PUT-------------
app.put('/products/:pid', (req,res)=>{
    const { pid } = req.params
    const entrada = req.body

    if(!id)

    if(!entrada.title || !entrada.description) {
        return res.status(400).send({status:'error', mensaje: 'Llenar todos los campos'})
    }

    const index = product.findIndex(products => products.id === pid)
    if(index === -1) res.send({status: 'error', message: 'No existe la entrada'})
    product[index] = {id: pid, ...entrada}

    res.send({product})
})


// app.delete('/products/:eid', (req, res) => {
//     let { eid } = req.params
//     const index = product.findIndex(entrada => entrada.id === eid)
//     if(index === -1) res.send({status: 'error', message: 'No existe la entrada'})
//     product = product.filter(user => user.id =distinto= eid)
//     res.send({status: 'success', payload: product})
// })


const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})