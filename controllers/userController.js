/*
Prashanna Karki
Shweta Chohan
Sudip
*/
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SignUp = mongoose.model('signup');
const Fligh = mongoose.model('flight');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/', (req, res) => {
    Fligh.find((err, docs)=>{
        console.log(docs)
        res.render("user/index", {
            flights: docs,
            userData: {
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name'),
                type: localStorage.getItem('type')
            }
        });
    });
    
});

router.post("/payments",(req, res) => {
    res.render("user/pay", {
        description: "Flight Playment"
    });
});

router.post('/getAll', (req, res) => {
    var origin = req.body.from;
    var destination = req.body.to
    var seats = req.body.seats
    var date = req.body.date
    console.log(req.body)
    var matcher = req.body;
    delete matcher['seats']
    if(origin == "" || destination == "" || seats == "" || date == ""){
        Flight.find((err, docs)=>{
            console.log(docs)
            res.status(201).json({
                message: "Please fill all details"
            });
        });
    }else{
        Fligh.find(req.body,(err, docs)=>{
            if(docs.length != 0){
                res.status(200).json({
                    message: "Flight List",
                    data: docs
                });
                
            }else{
                Fligh.find((err, docs)=>{
                    console.log(docs)
                    res.status(201).json({
                        message: "No matches found"
                    });
                });
            }
        });
    }
    console.log(req.body)
    // getAllRecords(req, res);
});


module.exports = router;