const mongoose = require('mongoose');

const polutionSchema = new mongoose.Schema({
    id: Number,
    tyoe: String,
    amount: Number,
    unit: String
});

module.exports = mongoose.model('Polution', polutionSchema);