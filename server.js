require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT;
const secretKey = process.env.SECRET_KEY;
const users = JSON.parse(fs.readFileSync('users.json'));
const expressLayouts = require('express-ejs-layouts');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layout');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Main page',
        subtitle: 'The Designer',
        user: req.session.user
    });
});

const checkLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/collections');
    }
    next();
};

app.get('/login', checkLoggedIn, (req, res) => {
    res.render('login', {
        title: 'Login',
        subtitle: 'The Designer',
        user: req.session.user
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user.username;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/collections/:year', async (req, res) => {
    const selected_year = req.params.year;

    try {
        const data = await fs.promises.readFile(path.join(__dirname, 'collections.json'), 'utf8');
        const collections = JSON.parse(data);

        res.render('collections', {
            title: `Collections ${selected_year}`,
            subtitle: `The designs ${selected_year}`,
            collections: collections[selected_year],
            user: req.session.user
        });

    } catch (error) {
        console.error('Error reading collections.json:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/contact/', (req, res) => {
    res.render('contact', {
        title: 'Informations',
        subtitle: 'Informations',
        user: req.session.user
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact form submitted!\nName: ${name}, Email: ${email}, Message: ${message}`);
    res.render('confirmation', {
        title: 'Informations',
        name: name,
        subtitle: 'Informations',
        user: req.session.user
    });
});

app.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'Page not found',
        subtitle: 'The Designer',
        user: req.session.user
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
