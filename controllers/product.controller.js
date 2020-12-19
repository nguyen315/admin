const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const productsModel = require('../models/products.model');
const cloudinary = require('../cloudinary/cloudinary');
const { image } = require('../cloudinary/cloudinary');

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
        products,
        hasNextPage,
        hasPrevPage,
        currentPage: page,
        pageLink
    });

}

exports.addProduct = function (req, res, next) {
    res.render('form_additem', {
        title: 'Add Item'
    });
}

exports.postAddProduct = async function (req, res, next) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        let title = fields.category;
        let basePrice = fields.basePrice;
        let name = fields.name;
        let imgs = [];

        if (err) {
            next(err);
            return;
        }
        const images = files.imgs;

        if (Array.isArray(images)) {
            for await (let image of images) {
                const result = await cloudinary.uploader.upload(image.path);
                imgs.push(result.url);
            }
        }

        else if (images && images.size > 0) {
            const result = await cloudinary.uploader.upload(images.path);
            imgs.push(result.url);
        }
        
        productsModel.addProduct(name, title, basePrice, imgs).then(() => {
            res.redirect('/');
        })  
    });
}

exports.editProduct = async function (req, res, next) {
    const productId = req.params.productId;

    const product = await productsModel.productById(productId);
    res.render('form_additem', {
        product: product
    })
}

exports.postEditProduct = async function (req, res, next) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        let id = fields.id;
        let title = fields.category;
        let basePrice = fields.basePrice;
        let name = fields.name;
        let imgs = [];

        if (err) {
            next(err);
            return;
        }
        const images = files.imgs;
        console.log(imgs);

        if (Array.isArray(images)) {
            for await (let image of images) {
                const result = await cloudinary.uploader.upload(image.path);
                imgs.push(result.url);
            }
        }

        else if (images && images.size > 0) {
            const result = await cloudinary.uploader.upload(images.path);
            imgs.push(result.url);
        }

        productsModel.updateProduct(id, name, title, basePrice, imgs).then(() => {
            res.redirect('/');
        })
    });
}

exports.deleteProduct = async function (req, res, next) {
    const productId = req.params.productId;
    await productsModel.deleteProduct(productId);
    res.redirect('/');
}