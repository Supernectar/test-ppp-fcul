const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    morada: String,
    distrito: String,
    concelho: String,
    cidade: String
});

module.exports = mongoose.model('Consumer', consumerSchema);