const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const { mongoose } = require('./db.js');
var questionsController = require('./controllers/questionController');

var subjectsController = require('./controllers/subjectController');

var topicsController = require('./controllers/topicController');

var userRoutesController = require('./controllers/userRouteController');

const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

/*Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// Make "public" Folder Publicly Available
app.use('/public', express.static('public'));

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/users', userRoutesController)

app.use('/questions', questionsController);

app.use('/subjects', subjectsController);

app.use('/topics', topicsController);


app.get('/favicon.ico', (req, res) => res.status(204));

app.use('*', (req, res, next) => {
    res.status(404);
    return res.json({
      statusCode :404,
      statusMessage: 'URL not found'
    })
  });
  
app.use(function (err, req, res, next) {
  console.error("Error",err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
  
  
const port = process.env.PORT || 3000  
app.listen(port, () => console.log('Server started at port : 3000'));