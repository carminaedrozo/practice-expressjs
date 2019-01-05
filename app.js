const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {check, validationResult} = require('express-validator/check');
const app = express();
const mysql = require('mysql');
const port = 3000;

const {getHomepage, getEditPage} = require('./routes/index');
const {addUser, deletePlayer, updatePlayer} = require('./routes/users')
//create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice_users'
});

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;
// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// };
//
// app.use(logger);
//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//Global Vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

app.get('/', getHomepage);

app.post('/users/add', [
    check('first_name').not().isEmpty().withMessage('The first name is required'),
    check('last_name').not().isEmpty().withMessage('The last name is required'),
    check('email').isEmail().withMessage('Invalid email')
], addUser);

app.get('/user/delete/:id', deletePlayer);

app.get('/user/edit/:id', getEditPage);

app.post('/user/update/:id', updatePlayer);
app.listen(port, function () {
    console.log("Server started on port 3000....");
});