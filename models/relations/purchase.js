
const Purchase = require('./../purchaseModel');
class PurchaseRelation extends Purchase {
    product=new String;
    details = new String;
   constructor(
       product='product'|| new String, 
       details ='details'|| new String
   ){

       super();
       this.product=product;
       this.details=details;

   }
}
module.exports = PurchaseRelation;
