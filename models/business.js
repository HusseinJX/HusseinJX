 
 //create model, show whata properties User object has and what thir type (string) is
 function Business(id='id', business='business', email='email', phone='phone', address='address', contact_name='contact_name'){
    this.id=id;
    this.business=business;
    this.email=email;
    this.phone=phone;
    this.address=address;
    this.contact_name=contact_name;

 };

 //export module
 module.exports = Business;
