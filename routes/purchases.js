const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const Purchases = require('./../controllers/purchase');
const Products = require('./../controllers/product');
const Purchase = require('./../models/purchase');

var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login');
    }
}
//var purchaseArray = [];


router.get('/', loggedin, (req, res) => {
    Purchases.getPurchaseList(req.session.passport.user.business_id).then((purchases) => {
        var newOrderID = new Array;
        purchases.forEach((purchase) => {
            newOrderID.push(purchase.order_id);
        });
        newOrderID = parseInt(newOrderID.at(-1)) + 1;
        //console.log('mew'+newOrderID);
        Products.getProductList().then((products) => {
            res.render('purchases/index', { products: products, newOrderID: newOrderID});
        });
    });
});






router.get('/list', loggedin, (req, res) => {
    var business_id = req.session.passport.user.business_id;
    console.log(business_id);
    Purchases.purchaseByBusiness(business_id).then((purchases) => {
        console.log(purchases);
        res.render('purchases/list', { purchases: purchases, layout: false });
    }).catch((err) => {
        console.log(err);
    });
});
router.get('/add', loggedin, (req, res) => {
    res.render('purchases/create', { layout: false });
});
router.post('/add', loggedin, (req, res) => {
    console.log(req.body);
    var results = [];
    req.body.list.forEach(element => {
        var purchase = new Purchase();
        purchase.order_id = element.orderid;
        purchase.product_id = element.product_id;
        purchase.quantity = element.quantity;
        purchase.date = element.date;
        purchase.cost = element.cost;
        purchase.business_id = req.session.passport.user.business_id;
        //console.log(purchase);
        Purchases.addPurchase(purchase).then((id) => {
            // results.push('{'+id+':true}')
        }).catch((err) => {
            results.push(element.product)
        });
    });
    if (results.length > 0) {
        var resJson = {
            status: false,
            notification: 'failed to submit purchase order of products: ' + results.toString()
        };
        res.json(resJson);

    } else {
        var resJson = {
            status: true,
            notification: 'successfully submitted purchase order'
        };
        res.json(resJson);
    };


});


router.get('/insert', loggedin, (req, res) => {
    Products.getProductList().then((products) => {
        res.render('purchases/create', { products: products, layout: false });
    });
});
router.get('/edit/:id', loggedin, (req, res) => {
    Purchases.purchaseById(req.params.id).then((purchases) => {
        res.render('purchases/edit', { layout: false, purchases: purchases });
    });
});
router.post('/edit/:id', loggedin, (req, res) => {
    var id = req.params.id;
    var purchase = new Purchase();
    purchase = req.body;
    // console.log(purchase);
    Purchases.editPurchase(id, purchase).then((rows) => {
        console.log(rows);
        if (rows) {
            var ans = {
                status: true,
                notification: 'Successfully edited purchase'
            };
            res.json(ans);
        } else {

            var ans = {
                status: false,
                notification: 'Failed to edit purchase'
            };
            res.json(ans);
        }
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/del/:id', loggedin, (req, res) => {
    var id = req.params.id;
    Purchases.delPurchase(id).then((rows) => {
        var j = {
            status: true,
            notification: 'purchase deleted',
        }
        res.json(j);
    });
});

router.post('/invoice', loggedin, (req, res) => {
    console.log(req.body.list);
    res.render('purchases/invoice', { purchaselist: req.body.list, layout: false });

});

module.exports = router;

