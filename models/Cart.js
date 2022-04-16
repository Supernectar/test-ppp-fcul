const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id: Number,
})

module.exports = mongoose.model(cartSchema);