var express = require('express');
var app = express();
var router = express.Router();
var controller = require('../controllers/user-actions');
var authentication = require('../controllers/authentication');
var jwt = require('jsonwebtoken');

router.post('/register', function(req,res) {
  controller.userregistration(req,res)
});
router.post('/login', function(req,res) {
  controller.userlogin(req,res)
});
router.get('/verify/:registerlink', function(req,res) {
    controller.registrationverify(req,res)
});
router.post('/forgotpassword', function(req,res) {
    controller.forgotpassword(req,res);
});
router.post('/reset/:resetlink', function(req,res) {
    controller.resetpassword(req,res);
});
// Authentication code
router.use(function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-api-key'];
  if(token) {
      jwt.verify(token, 'newapp@123', app.get('superSecret'), function(err, decoded) { 
          if(err) {
              return res.status(500).json({
                  title: 'Failed to Authenticate token',
                  error: err
              });
          } else {
              req.decoded = decoded;
              next();
            }
      });     
  } else {
      return res.status(403).json({ 
          data: 'No token provided',
          code: 1 
      });
  }
});
// Authentication will work for all these below routes
router.get('/userdetails', function(req,res) {
  controller.userdetails(req,res);
});
router.get('/allusers', function(req,res) {
  controller.allusers(req,res)
});
module.exports = router;
