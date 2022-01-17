//requiring mysql after installing package in terminal
var mysql = require ('mysql');

//setup mysql connection
var con =mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password'
});

//con.connect(function(err){});
con.connect(function(err){
    console.log('connected!');
    con.query(sql, function(err,result){
        console.log('Result: ' + result);
    });
});


