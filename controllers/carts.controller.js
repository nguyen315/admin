const cartsModel = require('../models/carts.model');


exports.index = async (req, res, next) => {
    const page = +req.query.page || 1;
    const perPage = 5   ;
    let status = req.query.status
    let currentStatus = ""
    let pageLink = "";
    let filter = {};
    
    if (status == undefined) {

    }
    else if (status == "all") {
        currentStatus = 'all'
    }
    else {
        filter.status=status
        currentStatus = status;
        pageLink += "&status=" + status;
    }
    
    console.log(filter);
    const carts = await cartsModel.list(filter, page, perPage);
    const numberOfCarts = await cartsModel.getNumberOfCarts(filter);

    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (numberOfCarts > ((page - 1) * perPage + carts.length))
        hasNextPage = true;
    else
        hasNextPage = false;

    res.render('carts', {
        title: 'Carts',
        carts,
        currentStatus,
        hasNextPage,
        hasPrevPage,
        currentPage: page,
        pageLink
    })
}

exports.cancleCart = async (req, res, next) => {
    const id = req.params.id;
    await cartsModel.cancelCart(id);
    res.redirect("back");
}

exports.processCart = async (req, res, next) => {
    const id = req.params.id;
    await cartsModel.processCart(id);
    res.redirect("back");
}