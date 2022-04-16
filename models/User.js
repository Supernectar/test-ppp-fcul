const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    password: String,
    email: String,
    phone: String,
    creditCard: String,
    nif: Number,
    type: [{
        type: String,
        default: 'user'
    }],
    storages: [{
        type: Schema.Types.ObjectId,
        ref: 'Storage',
    }]
})

module.exports = mongoose.model('User', userSchema);