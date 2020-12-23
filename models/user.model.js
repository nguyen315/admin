const { db } = require('../db/db');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUser = async (username, password, email, firstName, lastName) => {
  const usersCollection = db().collection('users');
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      usersCollection.insertOne({
        username: username,
        password: hash,
        email: email,
        avatar: '',
        firstName: firstName,
        lastName: lastName,
        role: 'admin',
        status: 'active'
      });
    });
  });
}

exports.checkCredential = async (username, password) => {
  const usersCollection = db().collection('users');
  const user = await usersCollection.findOne({username: username});
  if (!user) {
    return false;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return false;
  }
  else {
    return user;
  }
}

exports.getUserById = async (id) => {
  const usersCollection = db().collection('users');
  const user = await usersCollection.findOne({_id: ObjectID(id)});
  return user;
}

exports.getAllUserList = async() => {
    const usersCollection = db().collection('users');
    const users = await usersCollection.find({}).toArray();
    return users;
}