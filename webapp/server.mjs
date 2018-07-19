import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

const app = express();

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port     = process.env.PORT || 8080; // set our port

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/temperature', { useNewUrlParser: true }); // connect to our database

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

import api_routes from './server/routes/routes'

app.use(express.static('./frontend/build'));
app.use('/api', api_routes);

app.listen(port, err => {
  if (err) throw err;
  console.log('Application live at port ' + port);
});

