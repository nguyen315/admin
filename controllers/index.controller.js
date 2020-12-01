const productsModel = require('../models/products.model');


exports.index = async function (req, res, next) {
    // get books from models
    const products = await productsModel.list();
    // console.dir(products)
    // render page list
    res.render('index', { 
        title: 'Dashboard',
        products 
    });
}

exports.addProductRender = function (req, res, next) {
    res.render('form_additem', {
        title: 'form add item'
    });
}

exports.addProduct = async function (req, res, next) {
    const cover = req.body.cover;
    const name = req.body.title;
    const basePrice = req.body.basePrice;
    const imgs = req.body.imgs;

    await productsModel.addProduct(cover, name, basePrice, imgs);
    res.redirect('/');
}

exports.deleteProduct = async function (req, res, next) {
    const id = req.body.id
    // console.log(id)
    await productsModel.deleteProduct(id);
    res.redirect('/');
}

exports.updateProductRender = async function (req, res, next) {
    const id = req.body.id;
    // console.log("update render: ", id);
    const product = await productsModel.productById(id);
    res.render('form_additem', {
        product: product
    })
}
exports.updateProduct = async function (req,res,next){  
    const id = req.body.id;
    const cover = req.body.cover;
    const title = req.body.title;
    const basePrice = req.body.basePrice;
    const imgs = req.body.imgs;

    // console.log(id, cover, title, basePrice, imgs)
    await productsModel.updateProduct(id,cover,title,basePrice,imgs)


    res.redirect('/');
}
