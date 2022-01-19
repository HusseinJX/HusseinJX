 
 //create model, show whata properties User object has and what thir type (string) is
 function User(tb_user_id='tb_user_id', user='user', email='email', password='password', birth_date='birth_date'){
    this.tb_user_id=tb_user_id;
    this.user=user;
    this.email=email;
    this.password=password;
    this.birth_date=birth_date;

 };

 //export module
 module.exports = User;