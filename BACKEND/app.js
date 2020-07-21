const express = require('express');
const ProductData = require('./src/model/ProductData');
const User = require('./src/model/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var app = new express();
app.use(cors());
app.use(bodyparser.json());

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request -1');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request -2');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized Request-3');
    }
    req.userId = payload.subject;
    next();
}
app.get('/products', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.find()
        .then(function (products) {
            res.send(products);
        });
});
app.get('/addpage', verifyToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.send("Add Product Page Authorisation");
});
app.post('/insert', verifyToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);

    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();
});
app.get('/delete/:id', verifyToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ProductData.findOneAndDelete({ _id: id })
        .then(function () {
            ProductData.find()
                .then(function (products) {
                    res.send(products);
                });
            // console.log("deleted"+deleted);
        });
});
app.get('/edit/:id', verifyToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ProductData.findOne({ _id: id })
        .then(function (product) {
            res.send(product);
        });
});
app.post('/update', verifyToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("reqbody" + req.body);
    var product = {
        _id: req.body.product._id,
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    ProductData.findOne({ _id: product._id })
        .then(function (productret) {
            if (!productret) {
                return next(new Error('Could not load Document'));
            }
            else {
                var productupdate = new ProductData(product);
                console.log("findOne" + productret)
                // productupdate.save();
                console.log("findOne update" + productupdate)
                ProductData.findByIdAndUpdate(productupdate._id, productupdate, (er, updated) => {
                    console.log("updated" + updated);
                });
            }
        });
});

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        }
        else {

            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
            // res.status(200).send(registeredUser);
        }
    });
});

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let userData = req.body;
    console.log("inside login");
    console.log(userData);
    User.findOne({ email: userData.email } && { password: userData.password }, (err, user) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got user");
            console.log(user);
            if (!user) {
                console.log("Email Error");
                res.status(401).send('Invalid Email');
            } else
                if (user.password !== userData.password) {
                    console.log("Pswd Error");
                    res.status(401).send('Invalid Password');
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                    // res.status(200).send(user);
                }
        }
    });
});
app.listen(3000, function () {
    console.log('listening to port 3000');
});