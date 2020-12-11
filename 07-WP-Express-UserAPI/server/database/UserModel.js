const mongoose = require('mongoose');
const userSchema = require('./UserSchema');

/*Create User Model based on the userSchema*/
const User = mongoose.model('User' , userSchema);

/*Export the User Model*/
module.exports = User;