const mongoose  = require('mongoose');

var adminmodel = new mongoose.Schema({
    
    name:{type:String},
    email:{type:String},
    password:{type:String}
});

module.exports = mongoose.model('admin',adminmodel);