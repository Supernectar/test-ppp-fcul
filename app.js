const express = require('express');
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
const storageRoutes = require('./routes/storageRoutes')
const itemRoutes = require('./routes/itemRoutes')
const transportRoutes = require('./routes/transportRoutes')
const PORT = process.env.PORT || 5000;

// express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// connect to mongodb
mongoose.connect("mongodb+srv://dbUser:2nt1hlXDZmMJ8W3W@cluster0.riqez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/storages', storageRoutes);
app.use('/products', itemRoutes);
app.use('/transports', transportRoutes);

app.listen(PORT, () => {
    console.log("Server is running...");
});
