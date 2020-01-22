var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/',function(req,res){
    res.render("pages/index")
});

router.get('/addDriver',function(req,res){
    res.render("pages/addDriver", {error: ""});
});
router.post('/addDriver',function(req,res){
    // res.render("pages/addDriver")
    // res.json(req.body);
    // let id = firebase.database().ref().child
    firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.driverEmail, req.body.driverPasword)
    .then(user =>{
        res.json(user);
    })
    .catch(error=>{
        res.render("pages/addDriver",{
            error: error.message,
            action: "signup" 
        });
    });
});

router.get('/addTruck',function(req,res){
    let drivers = [];
    firebase.database().ref().child('Drivers').once('value').then(data=>{
        drivers = data;
        // res.json(drivers);
        res.render("pages/addTruck", {drivers: drivers});
    }).catch(e=>{
        res.render("pages/addTruck", {drivers: drivers});
    });
});


router.post('/addTruck', function(req,res){
    let id = firebase.database().ref().child('Trucks').push().key;
    let truck = {
        id: id,
        driverId: req.body.driver,
        truckModel: req.body.truckmodel,
        registrationNumber: req.body.TruckRegistrationNumber,
        truckCapacity: req.body.truckCapacity,
    };
    // res.json(truck);
    firebase.database().ref().child('Trucks').child(truck.id).set(truck).then(function (){
        res.json('1');
    })
    .catch(function(error){
        res.json(error);
    })

});

router.get('/allDrivers',function(req,res){
    let drivers = [];
    firebase.database().ref().child('Drivers').once('value').then(data=>{
        drivers = data;
        // res.json(drivers);
        res.render("pages/allDrivers", {drivers: drivers});
    }).catch(e=>{
        res.render("pages/allDrivers", {drivers: drivers});
    });
});

router.get('/allTrucks',function(req,res){
    let trucks = [];
    firebase.database().ref().child('Trucks').once('value').then(data=>{
        trucks = data;
        // res.json(trucks);
        res.render("pages/allTrucks", {trucks: trucks});
    }).catch(e=>{
        res.render("pages/allTrucks", {trucks: trucks});
    });
});

router.get('/driverdetail',function(req,res){
    let driver;
    let id = 0;
    id = req.query.id,
    firebase.database().ref().child('Drivers').child(id).once('value')
    .then(data=>{
        driver = data;
        // res.json(driver);
    res.render("pages/driverDetail", {driver : driver});
    })
    .catch(error=>{
        res.json(error);
    })
});

router.get('/truckdetail',function(req,res){
    let truck = [] ;
    let driver = [];
    let id = 0;
    id = req.query.id,
    firebase.database().ref().child('Trucks').child(id).once('value')
    .then(data=>{
        truck = data;
        let did = truck.val().driverId;
        firebase.database().ref().child('Drivers').child(did).once('value')
        .then(driverData=>{
            driver = driverData;
            // res.json(driver);
            res.render("pages/trucksDetail", {truck : truck, driver : driver});
        })
        // res.json(did);
    })
    .catch(error=>{
        res.json(error);
    })

});

router.get('/editdriver', function(req,res){
    let id = 0;
    let driver = [];
    id = req.query.id,
    firebase.database().ref().child('Drivers').child(id).once('value')
    .then(data=>{
        driver = data;
        res.render("pages/editDriver", {driver : driver});
    })
    .catch(error=>{
        res.json(error);
    })
});
router.post('/editdriver', function(req,res){
   let id = 0;
   id = req.body.id;
   let driver = {
       id : id,
       name : req.body.name,
       email : req.body.email,
       lisenceNumber : req.body.licenseNumber,
       phoneNumber : req.body.phoneNumber,
   } 
   firebase.database().ref().child('Drivers').child(id).set(driver)
   .then(function (){
    res.redirect('/admin/allDrivers');
    })
    .catch(error=>{
        res.json(error);
    })
});

router.get('/edittruck', function(req,res){
    let id = 0;
    let truck = [];
    let drivers =[];
    id = req.query.id,
    firebase.database().ref().child('Trucks').child(id).once('value')
    .then(data=>{
        truck = data;
        let did = truck.val().driverId;
        firebase.database().ref().child('Drivers').once('value')
        .then(driverData=>{
            drivers = driverData;
            // res.json(drivers);
            res.render("pages/editTruck", {truck : truck, drivers : drivers});
        })
    })
    .catch(error=>{
        res.json(error);
    })
});

router.post('/edittruck', function(req,res){
    let id = 0;
    id = req.body.id;
    let trucks = {
        id : id,
        truckCapacity : req.body.capacity,
        registrationNumber : req.body.registration,
        truckModel : req.body.model,
        driverId : req.body.driver,
    } 
    firebase.database().ref().child('Trucks').child(id).set(trucks)
    .then(function (){
     res.redirect('/admin/alltrucks');
     })
     .catch(error=>{
         res.json(error);
     })
 });

 router.get('/allusers',function(req,res){
    let users = [];
    firebase.database().ref().child('Users').once('value').then(data=>{
        users = data;
        // res.json(users);
        res.render("pages/allUsers", {users: users});
    }).catch(e=>{
        res.render("pages/allUsers", {users: users});
    });
});

router.get('/userinfo',function(req,res){
    let user = [];
    let id = 0;
    id = req.query.id,
    firebase.database().ref().child('Users').child(id).once('value')
    .then(data=>{
        user = data;
    res.render("pages/userinfo", {user : user});
    })
    .catch(error=>{
        res.json(error);
    })
});





module.exports = router;