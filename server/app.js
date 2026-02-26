const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Routers
const productRouter = require('./routers/product.router');
const authRouter = require('./routers/auth.router');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// To read request
app.use(morgan('dev'));

// Testing route
app.get('/api/test', (req, res) => {
    res.send('Server is running!');
});

// Routers
app.use('/api/product', productRouter);
app.use('/api/auth', authRouter);

// Connection to DB
mongoose.connect('mongodb://localhost:27017/lulini')
    .then(() => {
        console.log('Connected to local mongoDB!');

        app.listen(3000, () => {
            console.log("Server is listening on port 3000!");
        });
    })
    .catch((err) => console.log(err));
