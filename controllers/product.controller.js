const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const productsModel = require('../models/products.model');
const cloudinary = require('../cloudinary/cloudinary');
const { image } = require('../cloudinary/cloudinary');
const { ObjectID } = require('mongodb');

exports.index = async function (req, res, next) {
    const page = +req.query.page || 1;
    const perPage = 10;
    const categoryId = req.query.categoryId;
    const q = req.query.q;
    let pageLink = "";
    let currentCategoryId = "";
    let filter = {};

    if (categoryId == 'all') {
        currentCategoryId = 'all'
    }
    else if (categoryId) {
        filter.categoryId = ObjectID(categoryId);
        currentCategoryId = categoryId;
        pageLink += "&category=" + categoryId;
    }

    if (q) {
        filter.name = new RegExp(q, 'i');
        pageLink += "&q=" + q;
    }

    // get books from models
    const products = await productsModel.list(filter, page, perPage);
    let categoriesList = [];
    for await (let product of products) {
        categoriesList.push(await productsModel.categoryById(product.categoryId));
    }
    // console.log(categoriesList);

    // get all category
    let categories = await productsModel.getAllCategories();

    // Lấy các thông tin cho pagination
    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (await products.length > ((page - 1) * perPage + products.length))
        hasNextPage = true;
    else
        hasNextPage = false;

    // render page list
    res.render('index', {
        title: 'Dashboard',
        currentCategoryId,
        categories,
        products,
        hasNextPage,
        hasPrevPage,
        currentPage: page,
        pageLink,
        categoriesList
    });

}

exports.addProduct = async function (req, res, next) {
    const categories = await productsModel.getAllCategories();
    res.render('form_additem', {
        title: 'Add Item',
        categories
    });
}

exports.postAddProduct = async function (req, res, next) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        let name = fields.name;
        let categoryId = ObjectID(fields.categoryId);
        let basePrice = fields.basePrice;
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
        
        productsModel.addProduct(name, categoryId, basePrice, imgs).then(() => {
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