const express = require('express')
const router = express.Router()
const Storage = require('../models/Storage')
const User = require('../models/User')
const Item = require('../models/Item')
const jwt = require('jsonwebtoken')
const Product = require('../models/Product')

router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let storages = (await Storage.find()).filter((storage) => storage.visibility == 'public' || storage.owner == decoded.user._id);

        res.json(storages);
    } catch (err) {
        res.json(err)
    }
})

router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let { name, location } = req.body;

        let storage = await Storage.create({
            name: name,
            location: location,
            owner: decoded.user,
        });

        let user = await User.updateOne(decoded.user, {
            $push: { "storages": storage }
        });

        res.json(storage)
    } catch (err) {
        res.json(err)
    }
})

router.get('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let { id } = req.params;

        let storage = await Storage.findById(id);

        if (!storage) {
            res.status = 404;
            res.send('storage not found')
        }
        else if (storage.visibility == 'private') {
            if (storage.owner != decoded.user._id) {
                res.status(401);
                res.send('storage visibility is private');
            }
            else
                res.json(storage)
        }
        else
            res.json(storage)
    } catch (err) {
        res.send(err);
    }
})

router.post('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let { id } = req.params;
        let { item, price, unit, quantity } = req.body;

        let storage = await Storage.findById(id);
        let itm = await Item.findById(item);

        if (!itm) {
            res.json({ error: 'Item not found' });
        }

        else if (!storage) {
            res.json({ error: 'Storage not found' });
        }
        else if (storage.owner != decoded.user._id) {
            res.json({ error: 'You must be the owner to change this storage' });
        }

        else {

            // Falta verificar se o item que esta a ser inserido existe na lista de produtos do storage, se sim deve retornar um erro

            let product = await Product.create({
                item: item,
                price: price,
                unit: unit,
                quantity: quantity,
            })

            let storage = await Storage.updateOne({ _id: id }, {
                $push: { "products": product }
            });

            res.json(storage)
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let { id } = req.params;

        let storage = await Storage.findById(id);

        if (!storage) {
            res.status = 404;
            res.send('storage not found')
        }
        else if (storage.owner != decoded.user._id) {
            res.json({ error: 'You must be the owner to change this storage' });
        }
        else {

            let { name, location } = req.body;

            let storage = await Storage.updateOne({ _id: id }, {
                name: name,
                location: location,
            });

            res.json(storage)
        }
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.delete('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = await jwt.verify(token, 'secretkey');

        let { id } = req.params;

        let storage = await Storage.findById(id);

        if (!storage) {
            res.status = 404;
            res.send('storage not found')
        }
        else if (storage.owner != decoded.user._id) {
            res.json({ error: 'You must be the owner to change this storage' });
        }
        else {
            let storage = await Storage.deleteOne({ _id: id });

            res.json(storage)
        }
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

module.exports = router;