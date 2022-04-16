const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
    Item.find().then(result => res.send(result))
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const subtype = req.body.subtype;
    const brand = req.body.brand;
    const description = req.body.description;
    const producer = req.body.producer;
    const exp_date = req.body.exp_date;
    const polution = req.body.polution;
    const resource = req.body.resource;
    Item.insertMany({ id: id, name: name, type: type, subtype: subtype, brand: brand, description: description, producer: producer, exp_date: exp_date, polution: polution, resource: resource }).then(result => res.send(result));
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Item.findOne({ id: id }).then(result => res.send(result))
})

router.get('/:id/polution', (req, res) => {
    const id = req.params.id;
    Item.findOne({ id: id }).then(result => res.send(result.polution))
})

router.get('/:id/resources', (req, res) => {
    const id = req.params.id;
    Item.findOne({ id: id }).then(result => res.send(result.resource))
})

module.exports = router;