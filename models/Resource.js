const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    id: Number,
    name: String,
    amount: Number,
    unit: String
});

module.exports = mongoose.model('Resource', resourceSchema);