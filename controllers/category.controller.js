const categoryModel = require('../models/category.model');


exports.addCategory = (req, res, next) => {
  res.render('form_add_category', {
    title: 'Add Category'
  })
}

exports.postAddCategory = async (req, res, next) => {
  const name = req.body.name;
  await categoryModel.addCategory(name);
  res.redirect('/');
}