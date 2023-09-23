const mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    from: {
        type: String,
        required: 'This field is required.'
    },
    to: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: Date,
        required: 'This field is required.'
    },
    time: {
        type: String,
        required: 'This field is required.'
    },
    seats:{
        type: Number,
        required: 'This field is required'
    }
});

 
mongoose.model('flight', flightSchema);