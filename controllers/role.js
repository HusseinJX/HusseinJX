//knex 
const connection = require ('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(connection);
const Role = require('./../models/role');
const User = require('./../models/user');

async function addRole(role=Role){

    const [role_id] = await knex('roles').insert(role);
        return role_id;
}    
async function editRole(id, role=Role){
    const res = await knex('roles').where({id:id}).update(role);
    return res;
}
function getRoleList(){
    const role = new Role();
   return knex('roles').select(role);
}
function roleById(id){
    const role = new Role();
   return knex('roles').select(role).where({id:id});
}
function delRole(id){
    try{
       return knex('roles').delete().where({id:id});
    }catch(err){
        console.log(err);
    }
}
function findOne(email){
    var role = new Role();
    return knex('roles').select(role).where({email:email});
}
function find(){
    var role= new Role();
    return knex('roles').select(role);
}

module.exports = {
    addRole, getRoleList, delRole, editRole, roleById, findOne, find
};



