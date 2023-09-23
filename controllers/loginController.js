/*
Prashanna Karki
Shweta Chohan
Sudip
*/
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SignUp = mongoose.model('signup');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/', (req, res) => {
    res.render("login/login", {
        viewTitle: "Login"
    });
});


function authenticateUser(req, res) {
    
    var email = req.body.email
    var password = req.body.password

    console.log(req.body)

    // checks whehter user exists
    SignUp.find(req.body, (err, doc) => {
        console.log(err)
        console.log(doc.length)
        if(doc.length != 1){
            res.status(200).json({
                message: "Invalid password or email"
            });
        }else{
            console.log(doc[0]['type']);
            localStorage.setItem('type', doc[0]['type'])
            localStorage.setItem('name', doc[0]['name'])
            res.status(200).json({
                message: "User added successfully",
                data: doc
            });
            // redirecting user to respective routes
            // if(doc[0]['type'] == 'admin'){
            //     res.redirect("/flight/list")
            // }else{
            //     res.redirect("/search-flight")
            // }
        }
    });
}



router.post('/loginUser', (req, res) => {
    authenticateUser(req, res);
});


module.exports = router;