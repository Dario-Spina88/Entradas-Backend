const { Router } = require('express')

const router = Router()

const entradas = [
    {
        "title": "Recital Rock",
        "description": "Divididos",
        "price": 7500,
        "thumbnail": "Link",
        "code": 1,
        "stock": 6,
        "id": 1
    },
    {
        "title": "Recital Rock",
        "description": "Las Pelotas",
        "price": 8000,
        "thumbnail": "Link",
        "code": 2,
        "stock": 4,
        "id": 2
    },
    {
        "title": "Recital Rock",
        "description": "Fito Paez",
        "price": 7000,
        "thumbnail": "Link",
        "code": 3,
        "stock": 6,
        "id": 3
    },
]

const users = [
    {
    nombre: 'Dario',
    apellido: 'Spina',
    edad: 35,
    correo: 'dario@gmail.com',
    telefono: '3252-5325',
    role: 'admin'
    },
    {
    nombre: 'Raul',
    apellido: 'Lopez',
    edad: 24,
    correo: 'Raul@gmail.com',
    telefono: '5529-9825',
    role: 'user'
    },
    {
    nombre: 'Esteban',
    apellido: 'Garcia',
    edad: 30,
    correo: 'Esteban@gmail.com',
    telefono: '8896-2325',
    role: 'admin'
    }
];

router.get('/', (req, res)=>{

    let user = users[Math.floor(Math.random() * users.length)]
    let testUser = {
        title: 'Venta de tickets',
        user,
        isAdmin: user.role === 'admin',
        entradas,
        style:'index.css'
        
    }
    res.render('index', testUser)
})

module.exports = router