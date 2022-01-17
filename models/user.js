 
 //create model, show whata properties User object has and what thir type (string) is
 function User(id='id', user='user', email='email', password='password', birth_date='birth_date'){
    this.id=id;
    this.user=user;
    this.email=email;
    this.password=password;
    this.birth_date=birth_date;

 };

 //export module
 module.exports = User;