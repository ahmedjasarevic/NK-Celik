const bcrypt = require('bcrypt');
const User = require('./user');

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      req.session.user = { id: user._id, name: user.name, email: user.email };
      
      // Redirect the user to the home page after successful registration
      res.redirect('/home');
    } catch (error) {
      if (error.code === 11000) {
        return res.render('login', { error: "Email adresa vec postoji." });
      } else {
        return res.render('login', { error: "Neocekivana greska. Molimo pokusajte ponovo." });
      }
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // If user not found or password doesn't match, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render('login', { error: "Netacna email adresa ili sifra." });
      }

      // If user is found and password matches, set session and redirect to home
      req.session.user = user;
      res.redirect('/home');
    } catch (error) {
      return res.render('login', { error: error});
    }
  },
  async logout(req, res) {
    try {
      // Clear the user session
      req.session.destroy();

      // Redirect the user to the login page (or any other page)
      res.redirect('/home');
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = UserController;
