require("dotenv").config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const hbs = exphbs.create({ helpers });;

const sequelize = require('./config/connection');
const routes = require("./controllers");
const helpers = require('./utils/helpers'); 


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
	cookie: {
		secure: false,
		httpOnly: false,
		maxAge: 1000 * 3600 * 2,
		sameSite: true
	},
	secret: process.env.MY_SECRET,
	resave: false,
	saveUnintialized: true,
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
