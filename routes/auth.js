//require stuff
const express = require('express');
const router = express.Router();
const passport = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Users = require('../controllers/users');

//passport function module
module.exports = function(passport){

    //signup passport router post. 
    router.post('/signup',(req,res) =>{
        var user = new User();
        user = req.body;
        Users.findOne(user.email).then((users) =>{
            if(users.length <= 0){
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        //console.log(user.password);
                        Users.addUser(user).then((id) =>{
                            res.redirect('/login');
                        }).catch((err) =>{
                            res.redirect('/signup');
                        });
                    })
                });
            }else{
                res.redirect('/signup');
            }
        }).catch(function(err){
            console.log(err);
            res.status(500).send('error occured');
        });
    });
    //login passport router post 
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/', 
        failureFlash:true,}));
       
    (req,res) =>{
        var ans = {
            status:true,
            notification:'Login failed'
            };
        res.json(ans);
        
    };

    //return router
    return router;
}