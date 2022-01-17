//knex
const connection = require ('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(connection);
const User = require('./../models/user');
const UserRole = require('../models/relations/user_roles');
const UserRoles = require('../models/user_roles');

//define functions
async function addUser(user=User){

    const [user_id] = await knex('users').insert(user);
        return user_id;
}
async function editUser(id, user=User){
    const res = await knex('users').where({id:id}).update(user);
    return res;
}
function getUserList(){
    const user = new User();
    //console.log('me');
   return knex('users').select(user);
}

function userById(id){
    const user = new User();
   return knex('users').select(user).where({id:id});
}
function delUser(id){
    try{
       return knex('users').delete().where({id:id});
    }catch(err){
        console.log(err);
    }
}
function findOne(email){
    var user = new User();
    return knex('users').select(user).where({email:email});
}
async function addUserRole(business_user = UserRoles){
    const [id] = await knex('user_roles').insert(business_user);
    return id;
}
function removeUserRole(user_role = UserRoles){
    return knex('user_roles').where(user_role).del();
}
//RELATIONS TABLE!!!!
async function getUserRoles(user_id){
    var userroles = new UserRoles();
    //console.log('functioning'+user_id);
    var rows= await knex('user_roles').select(userroles).where('user_id',user_id);
    return rows;

}
//getuserrole function. joining 3 tables.
async function getUserRolesJoin(user_id){
    var userrole = new UserRole();
    const rows= await knex('user_roles').select(userrole).where('user_id',user_id).groupBy('user_id').join('roles',function(){
        this.on('roles.id', '=', 'user_roles.role_id');
    }).join('users',function(){
        this.on('users.id', '=', 'user_roles.user_id');
    }).join('businesses',function(){
        this.on('businesses.id', '=','user_roles.business_id' );
    });
    return rows;
}

//export modules
module.exports = {
    addUser, getUserList, delUser, editUser, userById, findOne, getUserRoles,getUserRolesJoin, addUserRole, removeUserRole
};
