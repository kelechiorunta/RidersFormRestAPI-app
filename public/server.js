const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors')
const formidable = require('formidable')
const ridersRoute = require('./register')
const path = require('path')

const port = process.env.port || 7000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
  origin: 'http://localhost:3002', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  preflightContinue: false, 
  optionsSuccessStatus: 204, 
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, 
  maxAge: 3600, 
};


app.use(cors(corsOptions));

app.use('/riders', ridersRoute)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});