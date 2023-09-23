/*
Prashanna Karki
Shweta Chohan
Sudip
*/
require('./models/db');
const express = require('express');
const path = require('path');;
const bodyparser = require('body-parser');
const flightController = require('./controllers/flightController');
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const { model } = require('mongoose');
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res)=>{
    console.log("visited")
    res.redirect("/public/views/index.html")
});
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
app.use('/search-flight', userController);
app.use('/flight', flightController);
app.use('/signup', signupController);
app.use('/login', loginController);
