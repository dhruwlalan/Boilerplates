module.exports = (user) => {
   user = user.toJSON();
   user.__v = undefined;
   user.password = undefined;
   if (process.env.NODE_ENV === 'production') {
      user.role = undefined;
      user._id = undefined;
      user.passwordChangedAt = undefined;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
   }
   return user;
};
