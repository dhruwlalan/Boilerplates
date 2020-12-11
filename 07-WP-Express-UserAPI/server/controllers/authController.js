const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../database/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


/*Checking if the User is Logged In*/
exports.isLoggedIn = async (req , res , next) => {
	try {
		let token;

		// grab token:
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) token = req.cookies.jwt;

		// check if token exists:
		if (!token) {
			req.token = false;
			return next();
		}

		// if there exist a token:
		if (token) {
			// verify the token:
			const decoded = await promisify(jwt.verify)(token , process.env.JWT_SECRET);
			
			// check if the user exists?:
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) return next();

			// check if the user has recently changed his password:
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				req.changedPassword = true;
				return next();
			}

			// there is a logged in user:
			req.token = true;
			req.user = currentUser;
			req.changedPassword = false;
			res.locals.user = currentUser;
			return next();
		}
	} catch (e) {
		return next();
	}
	next();
};

/*Protecting Routes to only Logged In Users*/
exports.protect = catchAsync(async (req , res , next) => {
	
	if (!req.token) return next(new AppError('You are not logged in! Please login to get access' , 401));
	
	if (!req.user) return next(new AppError('The user belonging to the token dose not exist!' , 401));
	
	if (req.changedPassword) return next(new AppError('User recently changed password! Please login again!' , 401));

	next();
});

/*Restricting Routes to only Admin Users */
exports.restrictTo = (...roles) => {
	return (req , res , next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action' , 403));
		}
		next();
	}
};