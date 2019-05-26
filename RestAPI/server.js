require('./db');

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

const trainController = require('./trainController');
const stationController = require('./stationController');
const cardController = require('./cardController');
const mobilePaymentController = require('./mobilePaymentsController');
const cardPaymentController = require('./cardPaymentController');

const userController = require('./userController');
const ticketController = require('./ticketController');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port,() =>console.log(`Listening on port ${port}....`));

app.use('/train',trainController);

app.use('/station',stationController);

app.use('/card',cardController);

app.use('/user',userController);

app.use('/tickets',ticketController);

app.use('/cardPayment',cardPaymentController);

app.use('/mobilePayment',mobilePaymentController);