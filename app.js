var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var {check, validationResult} = require('express-validator/check');
var app = express();

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

var users = [
    {
        id: 1,
        first_name: 'Inah',
        last_name: 'Edrozo',
        email: 'inahe@gmail.com'
    }, {
        id: 2,
        first_name: 'David',
        last_name: 'Velasquez',
        email: 'dvelasquez@gmail.com'
    }]
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Customers',
        users: users
    });
});

app.post('/users/add', [
        check('first_name').not().isEmpty().withMessage('The First name is required'),
        check('last_name').not().isEmpty().withMessage('The Last name is required'),
        check('email').isEmail().withMessage('Invalid email')
    ], function (req, res) {
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
        }else{
            var newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
            }
            console.log(newUser);
        }

    }
)
;
app.listen(3000, function () {
    console.log("Server started on port 3000....");
});