const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Product', productSchema);