const handlebars = require('express-handlebars');

var register = function(handlebars){
    var helpers = {

        //function
        ifRowExists: function(row, value, options) {
            var k = [];
            row.forEach(row => {
                if (row.role == value){
                    k.push(true);
                }else{
                    k.push(false);
                }
                // console.log(k);
            }); 
            if (k.includes(true)){
                return options.fn(this);
            }else{
                return options.inverse(this);
            }       
        },

        ifEquals: function(x,y, options){
            return (x==y)? options.fn(this): options.inverse(this);
            
        }

        //another helper
    }
    if (handlebars && typeof handlebars.registerHelper === 'function'){
        for (var prop in helpers) {
            handlebars.registerHelper(prop, helpers[prop]);
        }
    }else {
        return helpers;
    }
};

module.exports.register = register;
module.exports.helpers = register(null);

