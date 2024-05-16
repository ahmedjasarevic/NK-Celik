const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('./userController');
const News = require('./news');
const FanShopItem = require('./fanshop');
const crypto = require('crypto');
const path = require('path');

const sessionSecret = crypto.randomBytes(64).toString('hex');

const app = express();
const PORT = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/home', (req, res) => res.render('home', { user: req.session.user }));
app.get('/tim', (req, res) => res.render('tim', { user: req.session.user }));
app.get('/staff', (req, res) => res.render('staff', { user: req.session.user }));

app.get('/novosti', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ date: -1 }).limit(10);
    res.render('novosti', { newsArticles, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }

});
app.get('/novosti/:title/:id', async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    const user = req.session.user; 
    if (!newsArticle) {
      return res.status(404).send('News article not found');
    }
    if (req.params.title !== newsArticle.title.toLowerCase().replace(/ /g, '-')) {
      return res.redirect(`/novosti/${newsArticle.title.toLowerCase().replace(/ /g, '-')}/${newsArticle._id}`);
    }
    res.render('novostiDetalji', { newsArticle, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (req, res) => {
  const { user, error } = req.session;
  res.render('login', { user, error });
});

app.get('/fanshop', (req, res) => {
  const { user, error } = req.session;
  res.render('fanshop', { user, error });
});

app.get('/admin', async (req, res) => {
  try {
    if (!req.session.user || req.session.user.type !== 'admin') {
      return res.redirect('/home');
    }
    const newsItems = await News.find().sort({ date: -1 });
    const fanShopItems = await FanShopItem.find();
    res.render('admin', { newsItems, fanShopItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/profil', (req, res) => {
  const { user, error } = req.session;
  res.render('profil', { user, error });
});

app.post('/admin', (req, res) => {
  const { title, date, content, imageUrl } = req.body;
  const newsItem = new News({
    title,
    date: new Date(date),
    content,
    imageUrl
  });

  newsItem.save()
    .then(() => res.redirect('/admin'))
    .catch(err => res.status(400).send(err));
});

app.post('/delete-news/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/admin'))
    .catch(err => res.status(400).send(err));
});

app.post('/admin/fanshop/add', async (req, res) => {
  try {
    const { name, size, price, description, imageUrl, quantity } = req.body;
    const fanShopItem = new FanShopItem({
      name,
      size,
      price,
      description,
      imageUrl,
      quantity
    });

    await fanShopItem.save();
    res.redirect('/admin');
  } catch (error) {
    console.error('Error adding fan shop item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/admin/fanshop/delete/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { deleteQuantity } = req.body;

    const item = await FanShopItem.findById(itemId);

    if (!deleteQuantity || isNaN(deleteQuantity) || deleteQuantity <= 0 || deleteQuantity > item.quantity) {
      return res.status(400).send('Invalid delete quantity');
    }

    item.quantity -= deleteQuantity;

    if (item.quantity <= 0) {
      await FanShopItem.findByIdAndDelete(itemId);
    } else {
      await item.save();
    }

    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting fan shop item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Home URL: ${serverUrl}/home`);
});
