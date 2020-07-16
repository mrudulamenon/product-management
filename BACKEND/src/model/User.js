const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb');
const Schema = mongoose.Schema;
var UserSchema = new Schema({
    email : String,
    password : String
});
var Userdata = mongoose.model('user', UserSchema);

module.exports = Userdata;

