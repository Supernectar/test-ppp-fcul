const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Storage = require('../models/Storage')
const userController = require("../controllers/users")
const {checkToken} = require("../middlewares/verification")


router.get('/', /*checkToken,*/ userController.getAllUsers)

router.post('/', checkToken, userController.insertUser)

router.get('/:id', checkToken, userController.getUser)

router.put('/:id', checkToken, userController.updateUser)

router.delete('/:id', checkToken, userController.deleteUser)

router.get('/:id/storages', checkToken, userController.getUserStorage)

//user orders

router.get('/users/:username/orders', (req, res) => {
    const id = req.params.username;
    Order.find({ username: id }).then(result => res.send(result))
})

router.post('/users/:username/orders', (req, res) => {
    const status = req.body.status;
    const departureDate = req.body.departureDate;
    const arrivalDate = req.body.arrivalDate;

    Order.insertMany({ status: status, departureDate: departureDate, arrivalDate: arrivalDate }).then(result => res.send(result));
})

router.delete('/users/:username/orders', (req, res) => {
    const id = req.params.username;
    Order.deleteMany({ username: id }).then(result => res.send(result))
})

router.get('/users/:username/orders/:id', (req, res) => {
    const id = req.params.username;
    Order.findOne({ username: id }).then(result => res.send(result))
})

router.put('/users/:username/orders/:id', (req, res) => {
    const status = req.body.status;
    const departureDate = req.body.departureDate;
    const arrivalDate = req.body.arrivalDate;
    User.updateMany({ username: id }, { status: status, departureDate: departureDate, arrivalDate: arrivalDate }).then(result => res.send(result))
})

router.delete('/users/:username/orders/:id', (req, res) => {
    const id = req.params.username;
    Order.deleteMany({ username: id }).then(result => res.send(result))
})

module.exports = router;