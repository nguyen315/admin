const productsModel = require('../models/products.model');

exports.index = async function (req, res, next) {
    const page = +req.query.page || 1;
    const perPage = 1;
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
    console.log(pageLink);

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
exports.updateProduct = async function (req, res, next) {
    const id = req.body.id;
    const cover = req.body.cover;
    const title = req.body.title;
    const basePrice = req.body.basePrice;
    const imgs = req.body.imgs;

    // console.log(id, cover, title, basePrice, imgs)
    await productsModel.updateProduct(id, cover, title, basePrice, imgs)
    res.redirect('/');
}
