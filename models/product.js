 
 //create model, show whata properties User object has and what thir type (string) is
 function Product(id='tb_product_id', business_id='business_id', product='product',details ='details'){
    this.tb_product_id=id;
    this.business_id=business_id;
    this.product=product;
    this.details=details;
      
 };

 //export module
 module.exports = Product;
