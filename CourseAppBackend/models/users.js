const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required:true
    },
    mobile: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String
    },
}, {
    collection: 'users'
})

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.compare = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}


module.exports = mongoose.model('User', userSchema)