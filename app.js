const express = require ("express")
const ProductManager = require ("./ProductManager")

const app = express()
const product = new ProductManager("./entradas.json")

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", async (req,res)=>{
    try {
        const entradas = await product.getProducts()
        res.send({entradas})
    } catch (error) {
        console.log(error)   
    }
})


// app.get("/products", (req,res)=>{

//     console.log(req.params)

//     res.send({title: "producto", apellido: "spina"})
// })


// app.get("/products?limit=5", (req,res)=>{
//     console.log(req.params)

//     res.send({title: req.params.title, limite: "hasta 5 productos"})
// })


// app.get("/products/idProduct", (req,res)=>{
//     const {idProdcut} = req.params
//     const codigo = addProduct.find(user => user.code === idProdcut)
//     if(!codigo) return res.send({error: 'No se encontro el codigo'})
//     res.send(codigo)
// })


app.listen(8080, ()=>{
    console.log('escuchando el puerto 8080')
})