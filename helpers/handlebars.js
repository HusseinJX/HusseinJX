const handlebars = require('express-handlebars');
const Langage = require('./lang');

var register = function(handlebars){
    var helpers = {

        //function
        langAssist: function(phrase){
            if(phrase == undefined){
                return "undefined value is not string";
            }else{
                var formedPhrase= phrase.toString().replaceAll(' ', '_');
                console.log(formedPhrase);
                var lang = new Langage('en');
                var data = lang.getPhrase(formedPhrase);
                if(data.length<=0){
                    return "error occured";
                }else{
                    var language = JSON.parse(data);
                    console.log(language);
                    return language[''+formedPhrase+''];
                }
            }
        },

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

