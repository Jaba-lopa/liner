const express = require('express');
const app = express();
const createPath = require('./create-path/createPath');

const cabinRout = require('./routers/cabin-router');
const bookingRout = require('./routers/booking-router');

const PORT = 3000;

app.listen(PORT, 'localhost', (error) => error ? console.log(error) : console.log('server start'));

app.set('view engine', 'ejs');

// Middleware

app.use(express.static('static'));


app.get('/', (req, res) => {
    res.render(createPath('main'));
});

app.use(bookingRout);
app.use(cabinRout);

app.use((req, res) => {
    res.render(createPath('error'));
});