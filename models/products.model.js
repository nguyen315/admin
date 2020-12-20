const { db } = require('../db/db'); 
const ObjectID = require('mongodb').ObjectID;


exports.list = async (filter, page, perPage) => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find(filter).skip((page - 1) * perPage).limit(perPage).toArray();
    return books;
}

exports.getNumberOfBooks = async(filter) => {
    const booksCollection = db().collection('books');
    const num = await booksCollection.find(filter).count();
    return num;
}

exports.productById = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectID(id)});
    return book;
}

exports.addProduct = async (name, categoryId, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.insertOne({
        name: name,
        categoryId: ObjectID(categoryId),
        basePrice: basePrice,
        imgs: imgs
    })
}

exports.deleteProduct = async (id) => {
    const booksCollection = db().collection('books');
    await booksCollection.deleteOne({_id: ObjectID(id)});
}

exports.updateProduct = async (id, name, categoryId, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.updateOne({_id: ObjectID(id)}, {$set: {
                                                            name: name,
                                                            categoryId: ObjectID(categoryId),
                                                            basePrice: basePrice,
                                                            imgs: imgs}})
}