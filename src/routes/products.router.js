const { Router } = require('express')
const ProductManager = require('../managerDaos/ProductManager')

const router = Router()
const product = new ProductManager()
product.getProducts()


function mid1(req, res, next){
    res.send('Bloqueado el ingreso')
}

function mid2(req, res, next){
    req.dato2='dato dos'
    next()
}

router.use(mid2)

router.get('/', (req, res) => {
    try {
        const { limit } = req.query
        const products = product.getProducts()
        if(!limit) {
            return res.send({
                status: 'success',
                data: products
            })
        }
        return res.send({
            status: 'success',
            datos: req.dato2,
            products: products.slice(0, limit)
        })

    } catch (error) {
        console.log(error)   
    }
})

router.get("/:pid", async (req, res)=>{
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
router.post("/", async (req, res)=>{
    let entrada = req.body

    const products = await product.addProduct(entrada.title, 
        entrada.description,
        entrada.price,
        entrada.thumbnail,
        entrada.code,
        entrada.stock)

    if(!entrada.title || !entrada.description) {
        return res.status(400).send({status:'error', mensaje: 'Llenar todos los campos'})
    }
    
    res.status(200).send({ products })
})

//PUT-------------
router.put('/:pid', async (req,res)=>{
    const { pid } = req.params
    let entrada = req.body

    if(!entrada.title || !entrada.description) {
        return res.status(400).send({status:'error', mensaje: 'Llenar todos los campos'})
    }

    const index = product.findIndex(products => products.id === pid)
    if(index === -1) res.send({status: 'error', message: 'No existe la entrada'})
    product[index] = {id: pid, ...entrada}

    res.send({product})
})

// Delte---------------
router.delete('/:eid', async (req, res) => {
    let { eid } = req.params
    const index = await product.findIndex(entrada => entrada.id === eid)
    if(index === -1) res.send({status: 'error', message: 'No existe la entrada'})
    product = product.filter(user => user.id !== eid)
    res.send({status: 'success', payload: product})
})



module.exports = router