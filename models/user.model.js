const { db } = require('../db/db');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUser = async(username, password, email, firstName, lastName) => {
    const usersCollection = db().collection('users');
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
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

exports.checkCredential = async(username, password) => {
    const usersCollection = db().collection('users');
    const user = await usersCollection.findOne({ username: username });
    if (!user) {
        return false;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return false;
    } else {
        return user;
    }
}

exports.getUserById = async(id) => {
    const usersCollection = db().collection('users');
    const user = await usersCollection.findOne({ _id: ObjectID(id) });
    return user;
}

exports.getAllUserList = async() => {
    const usersCollection = db().collection('users');
    const users = await usersCollection.find({}).toArray();
    return users;
}
exports.updateDaTaUser = async(id, firstName, lastName, email) => {
    const user = db().collection('users');

    user.updateOne({ _id: ObjectID(id) }, { $set: { firstName: firstName, lastName: lastName, email: email } }, function(err, res) {
        if (err) throw err;
        console.log('update success: ' + res.result.nModified + ' record');

    });
}
exports.updateStatusUser = async(id, status) => {
    const user = db().collection('users');
    user.updateOne({ _id: ObjectID(id) }, { $set: { status: status } }, function(err, res) {
        if (err) throw err;
        console.log('update success: ' + res.result.nModified + ' record');

    });

}
exports.delUser = async(id) => {
    const user = db().collection('users');
    user.deleteOne({ _id: ObjectID(id) }, function(err, res) {
        if (err) throw err;
        console.log('delete success: ' + res.result.n + ' record');
    });
}
exports.getNumOfUsers = async() => {
    const usersCollection = db().collection('users');
    const num = await usersCollection.find({}).count();
    return num;
}
exports.list = async(filter, page, perPage) => {
    const userCollection = db().collection('users');
    const users = await userCollection.find(filter).skip((page * perPage) - perPage).limit(perPage).toArray();
    return users;
}