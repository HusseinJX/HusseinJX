 
 //create model, show whata properties User object has and what thir type (string) is
 class Purchase{
    id=new Number;
    order_id=new Number;
    business_id= new Number; 
    product_id= new Number; 
    quantity =new Number; 
    date=new Date; 
    cost=new Number;
    receipt=new Number;
    constructor(
      id='id' || new Number,
      order_id='order_id'|| new Number, 
      business_id='business_id'|| new Number, 
      product_id='product_id'|| new Number, 
      quantity ='quantity'|| new Number, 
      date='date'|| new Date, 
      cost='cost'|| new Number, 
      receipt='receipt'|| new String
    ){

    this.id=id;
    this.order_id=order_id;
    this.business_id=business_id;
    this.product_id= product_id;
    this.quantity=quantity;
    this.date=date;
    this.cost=cost;
    this.receipt=receipt;
    }
      
 };

 //export module
 module.exports = Purchase;
