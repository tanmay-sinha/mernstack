const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true } ).then(()=> console.log('connected db')).catch(err => console.log(err));

app.use('/api/items', items);
app.use('/api/users', require('./routes/api/users'));

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log('server started at PORT ', port));