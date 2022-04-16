const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    status: String,
    departureDate: Date,
    arrivalDate: Date,
    consumer: Consumer,
})

module.exports = mongoose.model('Order', orderSchema);