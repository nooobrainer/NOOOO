/*
Prashanna Karki
Shweta Chohan
Sudip
*/
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SignUp = mongoose.model('signup');

router.get('/', (req, res) => {
    res.render("signup/signup", {
        viewTitle: "Sign Up"
    });
});
function insertRecord(req, res) {
    var user = new SignUp();
    user.name = req.body.name
    user.email = req.body.email
    user.age = req.body.age
    user.password = req.body.password
    user.phone = req.body.phone
    user.type = req.body.type
    user.gender = req.body.gender

    user.save((err, doc) => {
        if (!err)
            res.status(200).json({
                message: "User added successfully"
            });
        else {
            if (err.from == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("flight/addOrEdit", {
                    viewTitle: "Add Flight",
                    flight: req.body
                });
            }
            else
                {
                    console.log('Error during record insertion : ' + err);
                }
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['fromError'] = err.errors[field].message;
                break;
            case 'email':
                body['toError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.post('/insertRecord', (req, res) => {
    insertRecord(req, res);
});


module.exports = router;