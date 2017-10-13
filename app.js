const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Map global promise
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useMongoClient: true
})
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// Ideas Route
app.get('/ideas', (req, res) => {
    res.render('ideas/ideas');
});

// Process Form
app.post('/ideas', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({
            text: 'Please add title'
        });
    }
    if (!req.body.details) {
        errors.push({
            text: 'Please add some details'
        });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        res.send('passed')
    }
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});