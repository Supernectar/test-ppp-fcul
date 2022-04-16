const express = require('express')
const router = express.Router()
const Transport = require('./../models/Transport')

router.get('/', (req, res) => {
    Transport.find().then(result => res.send(result))
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const max_load = req.body.max_load;
    const status = req.body.status;
    const plate = req.body.plate;
    Transport.insertMany({id: id, max_load: max_load, status: status, plate: plate}).then(result => res.send(result));
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Transport.findOne({id: id}).then(result => res.send(result))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Transport.deleteMany({id: id}).then(result => res.send(result))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const max_load = req.body.max_load;
    const status = req.body.status;
    Transport.updateMany({id: id}, {id: id, max_load: max_load, status: status}).then(result => res.send(result))
})

module.exports = router;