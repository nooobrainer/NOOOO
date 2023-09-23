const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    }, 
    email: {
        type: String,
        required: 'This field is required.',
    },
    age: {
        type: Number,
        required: 'This field is required.'
    },
    gender: {
        type: String,
        required: 'This field is required.'
    },
    password: {
        type: String,
        required: 'This field is required.'
    },
    phone: {
        type: String,
        required: 'This field is required.'
    },
    type: {
        type: String,
        required: 'This field is required.'
    },
});

// // Custom validation for email
signupSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('signup', signupSchema);