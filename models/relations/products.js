 //create model, show whata properties User object has and what thir type (string) is
 function Product(
    business_id='business_id', 
    product='product',
    details ='details', 
    business='business', 
    business_email='business_email', 
    phone='phone', 
    address='address', 
    contact_name='contact_name'){

    this.business_id=business_id;
    this.product=product;
    this.details=details;

    this.business=business;
    this.business_email=business_email;
    this.phone=phone;
    this.address=address;
    this.contact_name=contact_name;

 };

 //export module
 module.exports = Product;
