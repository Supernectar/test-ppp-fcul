const mongoose = require('mongoose')

const transportSchema = new mongoose.Schema({
    id: Number,
    max_load: Number,
    status: String,
    plate: String,
})

module.exports = mongoose.model('Transport', transportSchema)