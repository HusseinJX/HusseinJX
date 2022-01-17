 
 //create model, show whata properties User object has and what thir type (string) is
 function Purchase( product_id='product_id',order_id='order_id',quantity ='quantity', date='date', cost='cost', receipt='receipt', product='product',
 details ='details'){
    
   
    this.product_id=product_id;
    this.order_id=order_id;
    this.quantity=quantity;
    this.date=date;
    this.cost=cost;
    this.receipt=receipt;

    this.product=product;
    this.details=details;
      
 };

 //export module
 module.exports = Purchase;
