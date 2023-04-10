const {Router} = require ('express')
const CartManager = require('../managerDaos/cartsManager')
const ProductManager = require('../managerDaos/ProductManager')
const router = Router();
const productManager = new ProductManager('.products.json')
const cartManager = new CartManager('.carts.json')
const notFound = { error: "no se encontro el carrito" }


router.post("/", async (req, res) => {

    await cartManager.createCart()
    res.status(201).send({ status:'success', mensaje: "Cart created successfully" })
});


router.get("/:eid", async (req, res) => {

    const {eid}  = req.params
    const cart = await cartManager.getCartById(parseInt(eid))
    !cart ? res.status(404).send(notFound) : res.status(200).send({status:'success', cart})
});

router.post("/:eid/product/:pid", async (req, res) => {
    const { eid, pid } = req.params
    const product = await productManager.getProductById(parseInt(pid));
    if (product) {
    const cart = await cartManager.addToCart(parseInt(eid), parseInt(pid))
    !cart ? res.status(404).send(notFound) : res.status(200).send(cart)
    } else {
    res.status(404).send({ error: "no se encontro el carrito" })
    }
});

module.exports = router