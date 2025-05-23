const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userroute = require('./routes/users');
const resroute = require('./routes/restaurants');
const foodrout = require('./routes/foods');
const categroute = require('./routes/categories');
const orderoute = require('./routes/orders');
const { ConnectToDb } = require('./utils/db');
dotenv.config();
app.use(express.json());
const port = 4000;

ConnectToDb();

app.use('/api/users', userroute);
app.use('/api/restaurants', resroute);
app.use('/api/foods', foodrout);
app.use('/api/categories', categroute);
app.use('/api/orders', orderoute);



app.use((req, res, next) => {
    const error = new Error('this page not found');
    res.status(404)
    next(error);
})

app.use((error, req, res, next) => {
    res.status(404).json({ message: error.message })
})

app.listen(process.env.PORT || port, () => {
    console.log(`server on port ${process.env.PORT || port}`);

})