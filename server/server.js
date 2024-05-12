const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('./userController'); 
const crypto = require('crypto');
const path = require('path');

const sessionSecret = crypto.randomBytes(64).toString('hex');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));
  
const url = 'mongodb+srv://ahmed:ahmed123@nkcelik.qj8oewc.mongodb.net/?retryWrites=true&w=majority&appName=NKCelik';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use(express.static('public'));
app.use(express.json());

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.get('/logout', UserController.logout);
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'public')); 

app.get('/home', (req, res) => {
  const user = req.session.user; 
  res.render('home', { user }); 
});

app.get('/tim', (req, res) => {
  const user = req.session.user; 
  res.render('tim', { user }); 
});

app.get('/staff', (req, res) => {
  const user = req.session.user; 
  res.render('staff', { user }); 
});

app.get('/novosti', (req, res) => {
  const user = req.session.user; 
  res.render('novosti', { user }); 
});



app.get('/login', (req, res) => {
  console.log('Session User at login:', req.session.user); // Debug output
  const user = req.session.user; 
  const error = req.query.error;
  res.render('login', { user, error }); 
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});