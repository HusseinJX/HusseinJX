//knex 
const connection = require ('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(connection);
const ProductBusiness = require('./../models/relations/products')
const Product = require('./../models/product');

//define functions
async function addProduct(product=Product){
    const [product_id] = await knex('products').insert(product);
        return product_id;
}   
async function editProduct(id, product=Product){
    //console.log(id);
    const res = await knex('products').where({'id':id}).update(product);
    return res;
}
function getProductList(){
    const product = new Product();
   return knex('products').select(product);
}
function productById(id){
    const product = new Product();
   return knex('products').select(product).where({id:id});
}
function productByBusiness(business_id){
    const product = new ProductBusiness();
    return knex('products').select(product).where({business_id:business_id}).join('businesses',function(){
        this.on('businesses.id', '=', 'products.business_id')});
     
}
function delProduct(id){
    try{
       return knex('products').delete().where({id:id});
    }catch(err){
        console.log(err);
    }
}
function findOne(email){
    var product = new Product();
    return knex('products').select(product).where({email:email});
}

module.exports = {
    addProduct, getProductList, delProduct, editProduct, productById, findOne, productByBusiness
};



