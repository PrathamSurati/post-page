const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/27017/mini-project');

const userSchema = mongoose.Schema({
    name : String,
    email : String,

});

module.exports = mongoose.model('user', userSchema);