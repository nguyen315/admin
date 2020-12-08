const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const productsModel = require('../models/products.model');

exports.index = async function (req, res, next) {
    const page = +req.query.page || 1;
    const perPage = 10;
    const category = req.query.category;
    const q = req.query.q;
    let pageLink = "";
    let currentCategory = "";
    let filter = {};

    if (category == 'all') {
        currentCategory = 'all'
    }
    else if (category) {
        filter.title = category;
        currentCategory = category;
        pageLink += "&category=" + category;
    }

    if (q) {
        filter.name = new RegExp(q, 'i');
        pageLink += "&q=" + q;
    }
    // console.log(pageLink);

    // get books from models
    const productsCursor = await productsModel.list(filter, page, perPage);
    const products = await productsCursor.toArray();

    // get all category
    const allProducts = await productsModel.getAll();
    var categories = [];
    for (var i = 0; i < allProducts.length; i++) {
        categories.push(allProducts[i].title);
    }
    categories = [...new Set(categories)];

    // Lấy các thông tin cho pagination
    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (await productsCursor.count() > ((page - 1) * perPage + products.length))
        hasNextPage = true;
    else
        hasNextPage = false;

    // render page list
    res.render('index', {
        title: 'Dashboard',
        currentCategory: category,
        categories,
        products: products,
        hasNextPage,
        hasPrevPage,
        currentPage: page,
        pageLink
    });

}

exports.addProductRender = function (req, res, next) {
    res.render('form_additem', {
        title: 'Add Item'
    });
}

exports.addProduct = async function (req, res, next) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        let id = fields.id;
        let cover = fields.cover;
        let title = fields.category;
        let basePrice = fields.basePrice;
        let imgs = fields.imgs;
        let name = fields.name;

        if (err) {
            next(err);
            return;
        }
        const coverImage = files.cover;
        if (coverImage && coverImage.size > 0) {
            const fileName = coverImage.path.split('/').pop() + '.' + coverImage.name.split('.').pop();
            fs.copyFile(coverImage.path, __dirname.split('/controllers')[0] + '/public/images/books/' + fileName, function (err) {
                if (err)
                    throw err;
            });
            cover = '/images/books/' + fileName;
        }

        productsModel.addProduct(cover, name, title, basePrice, imgs).then(() => {
            res.redirect('/');
        })
    });
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
exports.updateProduct = async function (req, res, next) {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        let id = fields.id;
        let cover = fields.cover;
        let title = fields.category;
        let basePrice = fields.basePrice;
        let imgs = fields.imgs;

        if (err) {
            next(err);
            return;
        }
        const coverImage = files.cover;
        if (coverImage && coverImage.size > 0) {
            const fileName = coverImage.path.split('/').pop() + '.' + coverImage.name.split('.').pop();
            fs.copyFile(coverImage.path, __dirname.split('/controllers')[0] + '/public/images/books/' + fileName, function (err) {
                if (err)
                    throw err;
            });
            cover = '/images/books/' + fileName;
        }

        productsModel.updateProduct(id, cover, title, basePrice, imgs).then(() => {
            res.redirect('/');
        })
    });
}
