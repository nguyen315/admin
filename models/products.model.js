const { db } = require('../db/db'); 
const ObjectID = require('mongodb').ObjectID;


exports.list = async () => {
    // console.log('model db');
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({}).toArray();
    // console.dir(books);
    return books;
}

exports.productById = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectID(id)});
    // console.log(book)
    return book;
}

exports.addProduct = async (cover, title, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.insertOne({
        cover: cover,
        title: title,
        basePrice: basePrice,
        imgs: imgs
    })
}

exports.deleteProduct = async (id) => {
    const booksCollection = db().collection('books');
    await booksCollection.deleteOne({_id: ObjectID(id)});
}

exports.updateProduct = async (id, cover, title, basePrice, imgs) => {
    const booksCollection = db().collection('books');
    await booksCollection.updateOne({_id: ObjectID(id)}, {$set: { cover: cover,
                                                            title: title,
                                                            basePrice: basePrice,
                                                            imgs: imgs}})
}