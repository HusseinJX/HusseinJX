
class Purchase {
    id=new Number;
    order_id = new Number;
    // tb_business_id=new Number;
    product_id=new Number;
    quantity = new Number;
    date = new Date;
    cost = new Number;
    receipt = new String;
    constructor(
        id="id"|| new Number, 
        order_id='order_id'||new Number, 
        // tb_business_id='tb_business_id'||new Number, 
        product_id="product_id"||new Number,
        quantity='quantity'||new Number, 
        date='date'||new Date, 
        cost='cost'||new Number, 
        receipt='receipt'||new String
        ){
        // return this;
        this.id= id;
        this.order_id= order_id;
        // this.tb_business_id=tb_business_id;
        this.product_id= product_id;
        this.quantity=quantity;
        this.date=date;
        this.cost=cost;
        this.receipt=receipt;
        // this.total=new Float64Array(quantity*cost);
    }

    get(){
        return this;
    }
    set(order_id, business_id, product_id,quantity, date, cost, receipt){
        this.id = Math.floor(Math.random()*10000000000);
        this.order_id = order_id;
        this.business_id = business_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.cost = cost;
        this.receipt = receipt;
        var date1 = new Date();
        this.date = date || date1.toDateString();
        // console.log(this);
        return this.get()
        // this.get();
    }
    
}
module.exports = Purchase;
