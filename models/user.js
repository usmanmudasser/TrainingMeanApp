const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Model schema

const UserSchema = mongoose.Schema({
name:{
    type:String
},
email:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
});

//Export model to be access in other files
const User = module.exports = mongoose.model('User',UserSchema);

//Operations available for model

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUserName = function(username,callback){
    const query= {username:username}
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback){
    //encrypting user password before calling saving
    bcrypt.genSalt(10, (err,salt) =>
    {
        bcrypt.hash(newUser.password,salt,(err,hash) =>{
           
            if(err) throw err;
           
            newUser.password = hash;
            //saving user
            newUser.save(callback);
        });
    }
    );

}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}