//knex 
const connection = require ('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(connection);
const BusinessPurchases = require('./../models/relations/purchase')
const Purchase = require('./../models/purchaseModel');

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
    console.log(purchase);
   return knex('purchases').select(purchase).where({business_id:business_id});
}
function purchaseById(id){
    const purchase = new Purchase();
   return knex('purchases').select(purchase).where({id:id});
}
async function purchaseByBusiness(business_id){
    const PurchaseRelation = new BusinessPurchases();
    console.log(PurchaseRelation);
    return knex('purchases').select(PurchaseRelation).where('purchases.business_id',business_id).join('products',function(){
        this.on('products.tb_product_id', '=', 'purchases.product_id')});
     
}

function purchaseByProducts(product_id){
    const PurchaseRelation = new BusinessPurchases();
    console.log(PurchaseRelation);
    return knex('purchases').select(PurchaseRelation).where('purchases.product_id',product_id).join('products',function(){
        this.on('products.tb_product_id', '=', 'purchases.product_id')});
     
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
    addPurchase, getPurchaseList, delPurchase, editPurchase, purchaseById, findOne, purchaseByBusiness,purchaseByProducts
};



