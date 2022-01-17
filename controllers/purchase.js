//knex 
const connection = require ('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(connection);
const BusinessPurchases = require('./../models/relations/purchase')
const Purchase = require('./../models/purchase');

//define functions
async function addPurchase(purchase=Purchase){
    const [purchase_id] = await knex('purchases').insert(purchase);
        return purchase_id;
}   
async function editPurchase(id, purchase=Purchase){
    console.log(id);
    const res = await knex('purchases').where({'id':id}).update(purchase);
    return res;
}
function getPurchaseList(business_id){
    const purchase = new Purchase();
   return knex('purchases').select(purchase).where({business_id:business_id});
}
function purchaseById(id){
    const purchase = new Purchase();
   return knex('purchases').select(purchase).where({id:id});
}
function purchaseByBusiness(business_id){
    const purchase = new BusinessPurchases();
    return knex('purchases').select(purchase).where('purchases.business_id',business_id).join('products',function(){
        this.on('products.id', '=', 'purchases.product_id')});
     
}
function delPurchase(id){
    try{
       return knex('purchases').delete().where({id:id});
    }catch(err){
        console.log(err);
    }
}
function findOne(email){
    var purchase = new Purchase();
    return knex('purchases').select(purchase).where({email:email});
}

//export modules
module.exports = {
    addPurchase, getPurchaseList, delPurchase, editPurchase, purchaseById, findOne, purchaseByBusiness
};



