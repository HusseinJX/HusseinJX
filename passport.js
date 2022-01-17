const passport = require ('passport');
var localStrategy = require('passport-local').Strategy;
const bcrypt = require ('bcryptjs');

const Users = require('./controllers/users');
//const Business = require('./controllers/businesses');

module.exports = (passport) =>{
    passport.serializeUser((user,done)=>{
        //console.log("serializing");
        done(null,user);
    });
    passport.deserializeUser((user,done)=>{
        //console.log('deserializing');
        done(null,user);
    });


   passport.use(new localStrategy({
        usernameField:'email',
        passwordField:'password'
        },
        function(email, password, done){
            Users.findOne(email).then((user) =>{
                //console.log(user[0].id);
                Users.getUserRoles(user[0].id).then((user_roles) =>{
                    //console.log('user roles: '+user_roles);
                    bcrypt.compare(password, user[0].password, (err,res) =>{
                        if (res){
                            done(null, user_roles[0]);
                        }else{
                           console.log('failed');
                            done(null, false);
                        }
                    });
                }).catch((err) =>{
                    console.log('Userrole error in passport');
                    done(null, false)});
            }).catch((err) =>{
            console.log('findOne error');
            done(null, false);
        })}
    ))}



  