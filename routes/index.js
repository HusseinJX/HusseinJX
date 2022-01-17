//require stuff
const express = require('express');
const router = express.Router();
var Users = require('./../controllers/users');

//define loggedin function
var loggedin = function(req,res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login');
    }}
//router.gets
router.get('/', loggedin, function(req, res){
    var user_id = req.session.passport.user.id;
res.render('dashboard', {page_title:'Dashboard'});
});
router.get('/login', (req, res) => {
    res.render ('auth/login',{layout:"auth"});
});
router.get('/signup', (req, res) => {
    res.render ('auth/signup',{layout:"auth"});
});
router.get('/logout', (req, res) => {
    req.logout();
    res.render ('auth/login',{layout:"auth"});
});

//export router module
module.exports = router;
