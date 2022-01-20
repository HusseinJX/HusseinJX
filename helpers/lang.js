const fs = require('fs');
class Langage {
    language_code= 'en';
    constructor(langauge='en'||new String){
        this.language_code = langauge;
    };
    #lang(){
        //get the language code and creates the dir path
        var dir ={
            code:__dirname+"/languages/"+this.language_code+".json",
            def:__dirname+"/languages/en.json",
            lang:this.language_code
        };
        return dir;
    }
 
    #getLanguage(){
        
        var dir = this.#lang();
        //checks if the file in the directiory exists
        if (fs.existsSync(dir.code)){
            //if file exist it will open it  by running the openFile Function
            // console.log("file exist!");
            return this.#openFile(dir);
        }else{
            //if the file do not exits in the directiory
            console.log(dir.lang+" language file do not exist! creating file .... please wait!");
            try{
                //try to create the file and add default data in it.
                var data = fs.readFileSync(dir.def,{encoding:'ascii', flag:'r'});
                console.log("created file data",data);
                var ans =  fs.writeFileSync(dir.code, data, (err)=>{
                            if(err){
                                console.log("failed to create language file! error: ", err);
                            }else{
                                console.log("file created successfully and data is added!");
                            }
                        });
                if(ans){
                    return this.#openFile(dir);
                }
            }catch(err){
                //catch errors
                console.log("erro Message: ", err);
                return this.#openFile(dir);
            }
        }

}
#openFile(){
    // read file with ASCII encoding and return the string
    var dir = this.#lang();
    return fs.readFileSync(dir.code, {encoding:"ascii", flag:"r"});
}

#addPhrase(phrase){
    var dir = this.#lang();
    var data = this.#getLanguage();
    var langData;
    console.log("add phrase data: ", data);
        langData = JSON.parse(data);
        langData[''+phrase+''] = phrase.replaceAll('_', " ");
        // return writeFile(dir, JSON.stringify(langData));

    return this.#writeFile(langData);

}
#writeFile(data=new String){
    var dir = this.#lang();
    try{
        //try to create the file and add default data in it.
        // var defaultLanguage = fs.readFileSync(dir.def,{encoding:'ascii', flag:'r'});
        // console.log("write file directory: ",dir);
        fs.writeFileSync(dir.code, JSON.stringify(data), (err)=>{
            if(err){
                console.log("failed to create language file! error: ", err);
                throw err;
            }else{
                console.log("file created successfully and data is added!");
            }
        });
        return this.#openFile();
    }catch(err){
        //catch errors
        console.log("erro Message: ", err);
        return this.#openFile();
    }
}
 getPhrase(phrase){
    // var dir = this.#lang();
    var language = this.#getLanguage();
        try{
            console.log("get phrase language.phrase: ", phrase);
            if(language[''+phrase+'']==undefined){
                console.log("going to add");
                return this.#addPhrase(phrase);
            }else{
                console.log("going to back");
                return this.#openFile();
            }
        }catch(err){
            console.log(err);
        };
    }
}
module.exports = Langage;
// console.log(dir.code);
// console.log("file data: ", addPhrase('list', 'en'));