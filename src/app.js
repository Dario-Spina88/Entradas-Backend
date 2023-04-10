const express = require ("express")
const cookieParser = require('cookie-parser')
const ProductManager = require ("./managerDaos/ProductManager")
const { uploader } = require("./utils/multer")
const productRouter = require('./routes/products.router')
const viewsRouter = require('./routes/views.router')
const handlebars = require('express-handlebars')

const app = express()

// hbs______________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


let product = new ProductManager("./products.json")
product.getProducts()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())

app.use((req, res, next) => {
    console.log('mid app - time: ', Date.now())
    next()
})

// --------

app.use('/',  viewsRouter)

app.use("/api/products", productRouter)
// app.use("/api/carts", cartsRouter)


app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subio el archivo'
    })
})


app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('No subio')
})


const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})