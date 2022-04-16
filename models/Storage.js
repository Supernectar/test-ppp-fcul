const mongoose = require('mongoose');
const { Schema } = mongoose;

const storageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    popularity: {
        type: Number,
        default: 0,
    },
    location: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    visibility: {
        type: String,
        default: 'private',
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
    }],
})

module.exports = mongoose.model('Storage', storageSchema);