 //create model, show whata properties User object has and what thir type (string) is
 function UserRoles
 (role_id='role_id',business_id ='business_id', user='user',email='email', birth_date='birth_date', role='role', business='business', business_email='business_email', password='password', phone='phone', address='address', contact_name='contact_name'){


    
    this.role_id=role_id;
    this.business_id=business_id;

    this.user=user;
    this.email=email;
    this.birth_date=birth_date;
    
    this.role=role;

    this.business=business;
    this.business_email=business_email;
    this.password=password;
    this.phone=phone;
    this.address=address;
    this.contact_name=contact_name;

 };

 //export module
 module.exports = UserRoles;
