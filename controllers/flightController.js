/*
Prashanna Karki
Shweta Chohan
Sudip
*/
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Flight = mongoose.model('flight');

router.get('/', (req, res) => {
    res.render("flight/addOrEdit", {
        viewTitle: "Add Flight"
    });
});

// router.post('/', (req, res) => {
//     if (req.body._id == '')
//         insertRecord(req, res);
//         else
//         updateRecord(req, res);
// });

router.post('/addRecord', (req, res) => {
    insertRecord(req, res);
});

router.put('/editRecord', (req, res) => {
    updateRecord(req, res);
});


function insertRecord(req, res) {
    var flight = new Flight();
    flight.from = req.body.from;
    flight.seats = req.body.seats;
    flight.to = req.body.to;
    flight.date = req.body.date;
    flight.time = req.body.time;
    flight.save((err, doc) => {
        if (!err)
        res.status(200).json({
            message: "successfuly added"
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
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Flight.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { 
            res.status(200).json({
                message: "successfuly added"
            });
         }
        else {
            if (err.from == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("flight/addOrEdit", {
                    viewTitle: 'Update Flight',
                    flight: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Flight.find((err, docs) => {
        if (!err) {
            res.status(200).json({
                message: "successfuly added",
                data: docs
            });
        }
        else {
            console.log('Error in retrieving list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'from':
                body['fromError'] = err.errors[field].message;
                break;
            case 'to':
                body['toError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Flight.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({
                message: "Flight Details",
                data: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Flight.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({
                message: "successfuly deleted"
            });
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;