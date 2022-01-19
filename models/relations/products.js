 //create model, show whata properties User object has and what thir type (string) is
 const Product = require('./../product');
 class ProductRelation extends Product{
    business=new String;
    email=new String; 
    phone=new String;
    address=new String;
    contact_name = new String;
  constructor(
    business='business'|| new String,
    email='email'|| new String, 
    phone='phone'|| new String,
    address='address'|| new String,
    contact_name='contact_name'|| new String
  ){
    super();
    this.business=business;
    this.email=email;
    this.phone=phone;
    this.address=address;
    this.contact_name=contact_name;
  }
  get(){
    return this;
  }
};
 module.exports = ProductRelation;
