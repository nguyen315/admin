const { db } = require('../db/db'); 
const ObjectID = require('mongodb').ObjectID;


exports.list = async (filter, page, perPage) => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find(filter).skip((page - 1) * perPage).limit(perPage);
    return books;
}

exports.getAll = async() => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
}

exports.productById = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectID(id)});
    return book;
}

exports.addProduct = async (name, title, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.insertOne({
        name: name,
        title: title,
        basePrice: basePrice,
        imgs: imgs
    })
}

exports.deleteProduct = async (id) => {
    const booksCollection = db().collection('books');
    await booksCollection.deleteOne({_id: ObjectID(id)});
}

exports.updateProduct = async (id, name, title, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.updateOne({_id: ObjectID(id)}, {$set: {
                                                            name: name,
                                                            title: title,
                                                            basePrice: basePrice,
                                                            imgs: imgs}})
}