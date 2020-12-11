const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

///Define User Schema///
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please tell us your name!'],
   },
   email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email!'],
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   },
   password: {
      type: String,
      required: [true, 'A user must have a password!'],
      minlength: 8,
      select: false,
   },
   passwordConfirm: {
      type: String,
      required: [true, 'A user must have a password!'],
      minlength: 8,
      validate: {
         validator(val) {
            return val === this.password;
         },
         message: 'Password does not match!',
      },
   },
   passwordChangedAt: Date,
   passwordResetToken: String,
   passwordResetExpires: Date,
});

///Mongoose Query Middleware Hooks///
userSchema.pre('save', async function (next) {
   if (this.isNew) {
      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;
   } else if (!this.isModified('password')) {
      return next();
   } else {
      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;
      this.passwordChangedAt = Date.now() - 1000;
   }
   next();
});

///Instance Methods for Current Document Access///
userSchema.methods.correctPassword = async function (postedPassword, storedPassword) {
   const result = await bcrypt.compare(postedPassword, storedPassword);
   return result;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
   if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimestamp < changedTimeStamp;
   }
   return false;
};
userSchema.methods.createPasswordResetToken = function () {
   const resetToken = crypto.randomBytes(32).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   this.passwordResetExpires = Date.now() + 600000;
   return resetToken;
};

///Export the User Schema///
module.exports = userSchema;
