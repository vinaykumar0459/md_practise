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
                    msg: 'Username already exists, try with another username',
                    status: 1
                });
            } else if(docs[0].email == req.body.email) {
                res.status(201).json({
                    msg: 'Email already exists',
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
                    let main_url = 'http://localhost:4200/'
                    connection.update({ email: req.body.email }, { $set: { registerlink: register_link }, expireAfterSeconds: 20 }, function(err, docs) {});
                    const mailOptions = {
                        from: 'vinaykumar.webdesigner@email.com', // sender address
                        to: req.body.email, // list of receivers
                        subject: req.body.username + ', Registration confirmation mail', // Subject line
                        html: '<p>click here to register <a href="'+main_url+'verify/'+register_link+'">'+main_url+'verify/'+register_link+'</a></p>'// plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                    });
                    return res.status(200).json({
                        msg: 'User Successfully registered',
                        status: 3,
                        username : req.body.username
                    });
                }
            });
        }
    });
}
exports.registrationverify = function(req,res) {
    connection.findOne({registerlink : req.params.registerlink}, function (err, docs) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else if(docs) {
            connection.update({isregistered: true});
            docs.isregistered = true;
            docs.registerlink = "";
            docs.save();
            return res.status(200).json({
                msg: 'Email verified successfully',
                status: 2
            });
        } else {
            res.status(201).json({
                title: 'Invalid verify link or expired',
                status : 1
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
                if(docs[0].isregistered == false) {
                    return res.status(200).json({
                        msg: 'Email is not verified',
                        status: 4,
                        username : docs[0].username
                    });
                } else {
                    const payload = {
                        username: docs[0].username 
                    };
                    var token = jwt.sign(payload, 'newapp@123', app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                    });
                    return res.status(200).json({
                        msg: 'User Logged in Successfully',
                        status: 1,
                        username : docs[0].username,
                        token: token
                    });
                }
            } else {
                return res.status(201).json({
                    msg: 'Password wrong',
                    status: 2
                });
            }
        } else {
            return res.status(201).json({
                msg: 'Username or Email ID is wrong',
                status: 3
            });
        }
    });
}
exports.forgotpassword = function(req,res) {
    var User = connection({
        email : req.body.email
    });
    connection.findOne({email: req.body.email}, function(err, docs) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else {
            let reset_link1 = crypto.randomBytes(20, req.body.email).toString('hex');
            let reset_link2 = crypto.pseudoRandomBytes(20, req.body.email).toString('hex');
            let reset_link = reset_link1 + reset_link2;
            connection.update({ email: req.body.email }, { $set: { resetlink: reset_link }, expireAfterSeconds: 20 }, function(err, docs) {});
            const mailOptions = {
                from: 'vinaykumar.webdesigner@email.com', // sender address
                to: req.body.email, // list of receivers
                subject: req.body.username + ', Reset password mail', // Subject line
                html: '<p>click here to register <a href="http://localhost:3000/reset/'+reset_link+'">http://localhost:3000/reset/'+reset_link+'</a></p>'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
            });
            return res.status(200).json({
                msg: 'Reset password link sent to user mail id',
                status: 1
            });
        }
    });
}
exports.resetpassword = function(req,res) {
    connection.findOne({resetlink : req.params.resetlink}, function (err, docs) {
        if(err) {
            res.status(500).json({
                title: 'An error occurred',
                err: error
            });
        } else if(docs) {
            var newpass = cryptr.encrypt(req.body.password);
            docs.password = newpass
            docs.resetlink = "";
            docs.save();
            return res.status(200).json({
                msg: 'Password reset completed',
                status: 2
            });
        } else {
            res.status(201).json({
                title: 'Invalid reset link or expired',
                status : 1
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