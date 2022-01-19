 
 //create model, show whata properties User object has and what thir type (string) is
 function Purchase(id='id',order_id='order_id', business_id='business_id', quantity ='quantity', date='date', cost='cost', receipt='receipt'){
    this.id=id;
    this.order_id=order_id;
    this.business_id=business_id;
    this.product_id= modal_product_id;
    this.quantity=quantity;
    this.date=date;
    this.cost=cost;
    this.receipt=receipt;
      
 };

 //export module
 module.exports = Purchase;
