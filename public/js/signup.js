const { User } = require('./models');

// POST route for handling sign-up form submission
app.post('/signup', async (req, res) => {
  try {
    // Create a new user with the data from the form
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.logged_in = true;

    // Redirect the user to the dashboard page
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Error signing up. Please try again later.');
  }
});