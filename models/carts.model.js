const { db } = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.list = async (filter, page, perPage) => {
    const cartsCollection = db().collection('carts');
    const carts = await cartsCollection.find(filter).skip((page - 1) * perPage).limit(perPage).toArray();
    return carts;
}

exports.getNumberOfCarts = async(filter) => {
    const cartsCollection = db().collection('carts');
    const num = await await cartsCollection.find(filter).count();
    return num;
}

exports.getAllCarts = async () => {
    const cartsCollection = db().collection('carts');
    const carts = await cartsCollection.find({ status: { $nin: ["shopping", "cancle"] } }).toArray();
    return carts;
}

exports.getCartById = async (id) => {
    const cartsCollection = db().collection('carts');
    const cart = await cartsCollection.findOne({_id: ObjectID(id)});
    return cart;
}

exports.cancelCart = async (id) => {
    const cartsCollection = db().collection('carts');
    await cartsCollection.updateOne({ _id: ObjectID(id) }, {$set: {status: "cancle"}});
}

exports.processCart = async (id) => {
    const cartsCollection = db().collection('carts');
    const cart = await this.getCartById(id);
    if (cart.status == "pending") {
        cartsCollection.updateOne({ _id: ObjectID(id) }, {$set: {status: "delivering"}});
    }
    else if (cart.status == "delivering") {
        cartsCollection.updateOne({ _id: ObjectID(id) }, {$set: {status: "success"}});
    }
    return;
}