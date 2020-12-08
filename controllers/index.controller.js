const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const productsModel = require('../models/products.model');

exports.index = async function(req, res, next) {
    const page = +req.query.page || 1;
    const perPage = 10;
    // get books from models
    const productsCursor = await productsModel.list(page, perPage);
    const products = await productsCursor.toArray();

    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (await productsCursor.count() > ((page - 1) * perPage + products.length))
        hasNextPage = true;
    else
        hasNextPage = false;

    // render page list
    res.render('index', {
        title: 'Dashboard',
        products: products,
        hasNextPage,
        hasPrevPage,
        currentPage: page
    });

}

exports.addProductRender = function(req, res, next) {
    res.render('form_additem', {
        title: 'Add Item'
    });
}

exports.addProduct = async function(req, res, next) {
    const cover = req.body.cover;
    const name = req.body.title;
    const basePrice = req.body.basePrice;
    const imgs = req.body.imgs;

    await productsModel.addProduct(cover, name, basePrice, imgs);
    res.redirect('/');
}

exports.deleteProduct = async function(req, res, next) {
    const id = req.body.id
        // console.log(id)
    await productsModel.deleteProduct(id);
    res.redirect('/');
}

exports.updateProductRender = async function(req, res, next) {
    const id = req.body.id;

    // console.log("update render: ", id);

    const product = await productsModel.productById(id);
    res.render('form_additem', {
        product: product
    })
}
exports.updateProduct = async function(req, res, next) {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        const id = fields.id;
        const cover = fields.cover;
        const title = fields.title;
        const basePrice = fields.basePrice;
        const imgs = fields.imgs;

        if (err) {
            next(err);
            return;
        }
        const coverImage = files.coverImage;
        if (coverImage && coverImage.size > 0) {
            const fileName = coverImage.path.split('\\').pop() + '.' + coverImage.name.split('.').pop();
            fs.copyFile(coverImage.path, __dirname.split('\\controllers')[0] + '\\public\\images\\books\\' + fileName, function(err) {
                if (err)
                    throw err;
            });
            fields.cover = '/images/books/' + fileName;
        }


        console.log(files);

        productsModel.updateProduct(id, cover, title, basePrice, imgs).then(() => {
                res.redirect('/');
            })
            //console.log(id, cover, title, basePrice, imgs)
            // console.log(coverImage);
    });



}