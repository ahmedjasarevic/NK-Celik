const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('./userController'); 
const News = require('./news'); 
const crypto = require('crypto');
const path = require('path');

const sessionSecret = crypto.randomBytes(64).toString('hex');


const app = express();
const PORT = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));
  
const url = 'mongodb+srv://ahmed:ahmed123@nkcelik.qj8oewc.mongodb.net/?retryWrites=true&w=majority&appName=NKCelik';

mongoose.connect(url)
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

app.get('/novosti', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ date: -1 }).limit(10); // Fetch latest 10 news articles
    const user = req.session.user; // Assuming you're using sessions to store user data
    res.render('novosti', { newsArticles, user }); // Pass both newsArticles and user data to the template
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



app.get('/login', (req, res) => {
  const user = req.session.user; 
  const error = req.query.error;
  res.render('login', { user, error }); 
});


app.get('/profil', (req, res) => {
  const user = req.session.user; 
  const error = req.query.error;
  res.render('profil', { user, error }); 
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Home URL: ${serverUrl}/home`);
});

