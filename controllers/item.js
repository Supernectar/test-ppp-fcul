const jwt = require('jsonwebtoken')
const Item = require('../models/Item')

getAllItems = async (req, res) => {
    try {
        let users = await Item.find();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
}

insertItem = async (req, res) => {
    try {
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

        let item = await Item.insertMany({ 
            id: id, 
            name: name, 
            type: type, 
            subtype: subtype, 
            brand: brand, 
            description: description, 
            producer: producer, 
            exp_date: exp_date, 
            polution: polution, 
            resource: resource });

        res.json(item);
    }
    catch (err) {
        res.json(err);
    }
}

getItem = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Item.findOne({ id: id });
        res.json(item);
    }
    catch (err) {
        res.json(err);
    }
}

getItemPolution = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Item.findOne({ id: id });
        res.json(item.polution);
    }
    catch (err) {
        res.json(err);
    }
}

getItemResources = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Item.findOne({ id: id });
        res.json(item.resource);
    }
    catch (err) {
        res.json(err);
    }
}

module.exports.getAllItems = getAllItems;
module.exports.insertItem = insertItem;
module.exports.getItem = getItem;
module.exports.getItemPolution = getItemPolution;
module.exports.getItemResources = getItemResources;
