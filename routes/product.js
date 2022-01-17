const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const Products = require('./../controllers/product');
const Product = require('./../models/product');

var loggedin = function(req,res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login');
    }}
router.get('/',  loggedin, (req, res)=>{
    res.render('products/index' );
});
router.get('/list',loggedin, (req, res)=>{
    var business_id = req.session.passport.user.business_id;
    Products.productByBusiness(business_id).then((products)=>{
        res.render('products/list', {products:products, layout:false});
    }).catch((err)=>{
        console.log(err);
    });
});
router.get('/add', loggedin,  (req, res)=> {
    res.render('products/create', {layout:false});
});
router.post('/add', loggedin,  (req, res)=>{
    var product = new Product();
    product = req.body;
    Products.addProduct(product).then((id)=>{
        var ans = {
            status:true,
            notification:'Successfully added new product'
        };
        res.json(ans);
    }).catch((err)=>{
        console.log(err);
        var ans = {
            status:false,
            notification:'Failed to add new product'
        };
        res.json(ans);
    });
});
router.get('/edit/:id',loggedin, (req, res)=>{
    Products.productById(req.params.id).then((products)=>{
        res.render('products/edit', {layout:false, products:products});
    });
});
router.post('/edit/:id',loggedin, (req, res)=>{
    var id = req.params.id;
    var product = new Product();
    product = req.body;
    // console.log(product);
    Products.editProduct(id, product).then((rows)=>{
        console.log(rows);
        if(rows){
            var ans = {
                status:true,
                notification:'Successfully edited product'
            };
            res.json(ans);
        }else{

        var ans = {
            status:false,
            notification:'Failed to edit product'
        };
        res.json(ans);
        }
    }).catch((err)=>{
        console.log(err);
    });
});
router.post('/del/:id',loggedin, (req, res)=>{
    var id = req.params.id;
    Products.delProduct(id).then((rows)=>{
        var j ={
            status:true,
            notification:'product deleted',
        }
        res.json(j);
    });
});

module.exports = router;
