var connection = require('./user-schema');
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('newappsecret03042018@!@#$%(');
var nodemailer = require('nodemailer');
var secretpass = cryptr.decrypt('9786dc3dbf708c052fe8b1455b12c3d6');
var crypto = require('crypto');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'vinaykumar.webdesigner@gmail.com',
           pass: secretpass
       }
});

exports.userregistration = function(req,res) {
    var encryptedString = cryptr.encrypt('vinay');
    var User = new connection({
        username : req.body.username,
        email : req.body.email,
        dateofbirth : req.body.dateofbirth,
        mobile : req.body.mobile,
        gender : req.body.gender,
        createdat: new Date(),
        isregistered: false
    });
    User.password = cryptr.encrypt(req.body.password);
    connection.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, function(err, docs) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        } else if(docs.length) {
            if(docs[0].username == req.body.username) {
                res.status(201).json({
                    data: 'Username already exists, try with another username',
                    status: 1
                });
            } else if(docs[0].email == req.body.email) {
                res.status(201).json({
                    data: 'Email already exists',
                    status: 2
                });
            }
        } else {
            User.save(function(err, data) {
                if(err)  {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                } else {
                    let register_link1 = crypto.randomBytes(20, req.body.username).toString('hex');
                    let register_link2 = crypto.pseudoRandomBytes(20, req.body.email).toString('hex');
                    let register_link = register_link1 + register_link2;
                    connection.update({ email: req.body.email }, { $set: { registerlink: register_link } }, function(err, docs) {});
                    const mailOptions = {
                        from: 'vinaykumar.webdesigner@email.com', // sender address
                        to: req.body.email, // list of receivers
                        subject: req.body.username + ', Registration confirmation mail', // Subject line
                        html: '<p>click here to register <a href="">'+ register_link +'</a></p>'// plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                    });
                    return res.status(200).json({
                        data: 'User Successfully registered',
                        status: 3,
                        docs: data
                    });
                }
            });
        }
    });
}
exports.userlogin = function(req,res) {
    connection.find({ $or: [ {username:req.body.username}, {email: req.body.email} ]}, function(err, docs) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else if(docs.length) {
            var password = cryptr.encrypt(req.body.password);
            if(docs[0].password == password) {
                const payload = {
                username: docs[0].username 
                };
                var token = jwt.sign(payload, 'newapp@123', app.get('superSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
                });
                return res.status(200).json({
                    data: 'User Logged in Successfully',
                    code: 1,
                    username : docs[0].username,
                    token: token
                });
            } else {
                return res.status(201).json({
                    data: 'Password wrong',
                    code: 2
                });
            }
        } else {
            return res.status(201).json({
                data: 'Username or Email ID is wrong',
                code: 3
            });
        }
    });
}
exports.userdetails = function(req,res) {
    connection.find({ username: 'vinay' }, function(err, data) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else {
            return res.status(200).json({
                data: 'User Details',
                code: 1,
                data : data
            });
        }
    })
}
exports.allusers = function(req,res) {
    connection.find({}, function(err, data) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else {
            return res.status(200).json({
                data: 'Authenticated Successfully',
                code: 1,
                data : data
            });
        }
    });
}