const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const Users = require('./../controllers/users');
const Roles = require('./../controllers/role');
const User = require('./../models/user');
const UserRole = require('../models/user_roles');
const user_roles = require('../models/relations/user_roles');
var role_list = require('./role_list');

const bcrypt = require('bcryptjs');
// const role = require('./role_list');
const { readSync } = require('fs');
const Role = require('../models/role');
var passport_session_user_data;

//login
var loggedin = function(req,res, next){
    if(req.isAuthenticated()){
        next()
        }else{
        res.redirect('/login');
        }
}



// define checkRoles function
var checkRoles = (...role_list)=> (req,res, next)=>{
    Users.getUserRolesJoin(req.session.passport.user.user_id).then((rows)=>{
        console.log(rows);
        var role_status = [];
        rows.forEach(row => {
            if (role_list[0].includes(row.role)){
                role_status.push(true);
            }else{
                role_status.push(false);
            }
        });
        if (role_status.includes(true)){
            next();
        }else{
            res.redirect('/');
        }
    });
}  

router.get('/', loggedin, checkRoles(role_list.superadmin), (req, res)=>{
        //add loggedin middleware
    res.render('users/index' );
    
});
router.get('/list', loggedin,(req, res)=>{
    //add loggedin middleware
    Users.getUserList().then((rows)=>{
        //rsconsole.log('rendering');
        res.render('users/list', {users_list:rows, layout:false});
    }).catch((err)=>{
        throw err;
    });
});
router.get('/add', loggedin,  (req, res)=> {
    res.render('users/create', {layout:false});
});
router.post('/add', loggedin,  (req, res)=>{
    var user = new User();
    user = req.body;
// console.log(user);
    Users.findOne(user.email).then((users) =>{
        if(users.length <= 0){
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    Users.addUser(user).then((id) =>{
                        var business_user = new UserRole();
                        business_user.user_id = id;
                        //default user role
                        business_user.role_id = 2;
                        business_user.business_id = req.session.passport.user.business_id;
                        Users.addUserRole(business_user).then((id)=>{
                            var ans = {
                                status:true,
                                notification:'Successfully added new user'
                            };
                            res.json(ans);
                        }).catch((err)=>{
                        console.log(err);
                    });                        
                        
                }).catch((err) =>{
                    console.log(err);
                    var ans = {
                        status:false,
                        notification:'Failed to add new user'
                    };
                    res.json(ans);
                });
            })
        });
    }else{
        var ans = {
            status:false,
            notification:'User already exist'
        };
        res.json(ans);
    }
}).catch(function(err){
    console.log(err);
    res.status(500).send('error occured');

});
});
router.get('/edit/:id',loggedin, (req, res)=>{
    var id = req.params.id
    console.log(id);
    Users.userById(id).then((users)=>{
        res.render('users/edit', {layout:false, users:users});
    });
});
router.post('/edit/:id',loggedin, (req, res)=>{
    var id = req.params.id;
    var user = new User();
    
            Users.editUser(id, user).then((rows)=>{
                
                if(rows){
                    var ans = {
                        status:true,
                        notification:'Successfully edited user'
                    };
                    res.json(ans);
                }else{
                    
                var ans = {
                    status:false,
                    notification:'Failed to edit user'
                };
                res.json(ans);
                }
            });
        });
        
router.get('/updaterole', loggedin,  (req, res)=> {
    res.render('users/create', {layout:false});
});
router.get('/roles/:id', (req, res)=>{
    Roles.find().then((roles)=>{
        Users.getUserRolesJoin(req.params.id).then((user_roles)=>{
            res.render('users/roles', {layout:false ,user_roles:user_roles, roles:roles,  user_id:req.params.id});
        })
    
    });
});
router.post('/roles/:id', (req, res)=>{
    var user_role = new UserRole();
    var t = {
        user_id : req.params.id,
        role_id : req.body.role_id
    }
    user_role = t;
    console.log(user_role);
    Users.getUserRolesJoin(user_roles.user_id).then((rows)=>{
        var v = [];
        rows.forEach(row=>{
            return (row.role_id == user_role.role_id) ? v.push(true): v.push(false);
        });
        // console.log(v);
        if(v.includes(true)){
            Users.removeUserRole(user_role).then((id) => {
                var t = {
                    status:'true',
                    notification:'user role removed success'
                }
                res.json(t);
            })
        }else{
            Users.addUserRole(user_role).then((id) => {
                var t = {
                    status:'true',
                    notification:'user role added success'
                }
                res.json(t);

            });
        }
    });
});
router.post('/del/:id',loggedin, (req, res)=>{
    var id = req.params.id;
    Users.delUser(id).then(function(rows){
        var j ={
            status:true,
            notification:'user deleted',
        }
        res.json(j);
        //res.render('users/index');

    });
});


module.exports = router;

