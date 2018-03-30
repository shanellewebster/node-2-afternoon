const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const massive = require('massive');
const pc = require('./controller/products_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
.then(dbInstance => app.set('db', dbInstance));

app.post('/api/product', pc.create);
app.get('/api/products', pc.getAll);
app.get('/api/product/:id', pc.getOne);
app.put('/api/product/:id', pc.update);
app.delete('/api/product/:id', pc.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server listening on port ${port}.`);});