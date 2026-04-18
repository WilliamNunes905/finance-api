const express = require('express');
const app = express();
const routers = require('./routes');

app.use(express.json());
app.use(routers);


module.exports = app;