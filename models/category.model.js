const { db } = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.listCategory = async(filter, page, perPage) => {
    const categoriesCollection = db().collection('categories');
    const categories = await categoriesCollection.find(filter).skip((page - 1) * perPage).limit(perPage).toArray();
    return categories;
}

exports.categoryById = async(categoryId) => {
    const categoriesCollection = db().collection('categories');
    const category = await categoriesCollection.findOne({ _id: ObjectID(categoryId) });
    return category;
}

exports.getAllCategories = async() => {
    const categoriesCollection = db().collection('categories');
    const categories = await categoriesCollection.find({}).toArray();
    return categories;
}

<<<<<<< Updated upstream
exports.addCategory = async (name) => {
  const categoriesCollection = db().collection('categories');
  await categoriesCollection.insertOne({
    name: name
  });
}

=======
exports.addCategory = async(name) => {
    const categoriesCollection = db().collection('categories');
    await categoriesCollection.insertOne({
        name: name
    });
}
>>>>>>> Stashed changes
