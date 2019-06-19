const router = require('express').Router()
const placeOrder = require('./controllers/placeOrder')
const listOrder = require('./controllers/listOrder')
const takeOrder = require('./controllers/takeOrder')

// POST - place order
router.post('/', placeOrder)
// PATCH - take order
router.patch('/:id', takeOrder)
// GET - list order
router.get('/', listOrder)

module.exports = router