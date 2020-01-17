var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/',function(req,res){
    res.render("pages/index")
});

router.get('/addDriver',function(req,res){
    res.render("pages/addDriver")
});

router.get('/addTruck',function(req,res){
    res.render("pages/addTruck")
});

router.get('/allDrivers',function(req,res){
    res.render("pages/allDrivers")
});

router.get('/allTrucks',function(req,res){
    res.render("pages/allTrucks")
});

router.get('/driverDetail',function(req,res){
    res.render("pages/driverDetain")
});

router.get('/trucksDetail',function(req,res){
    res.render("pages/trucksDetail")
});








module.exports = router;