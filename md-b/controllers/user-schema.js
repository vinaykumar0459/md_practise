var mongoose = require('mongoose');
mongoose.connect('mongodb://new_dbs:new_dbs@ds231719.mlab.com:31719/tests');

// mongoose.connection.on('connected', function() {
//     console.log('Database connected successfully');
// });

// mongoose.connection.on('error', function(err) {
//   console.log('Database not connected ' +err);
// });

var userRegister = mongoose.Schema({
    username:  { type:String, required: true, unique: true },
    email:  { type:String, required: true, unique: true },
    password:  { type:String, required: true },
    dateofbirth:  { type:String, required: true },
    mobile:  { type:Number, required: true },
    gender:  { type:String, required: true },
    createdat:  { type:String, required: true },
    isregistered: { type: Boolean },
    registerlink: { type: String }
});

var user = mongoose.model("tests", userRegister);

module.exports = user;