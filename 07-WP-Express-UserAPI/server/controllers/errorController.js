const AppError = require('../utils/appError');

// Send Error Based on Environment:
const sendErrorDev = (err , res) => {
	res.status(err.statusCode).json({
		message: err.message ,
		error: err ,
		stack: err.stack ,
	});
}
const sendErrorProd = (err , res) => {
	if (err.isOperational) {
		if (err.name === 'Error') {
			res.status(err.statusCode).json({
				status: err.status ,
				message: err.message ,
			});
		} else {
			res.status(err.statusCode).json({
				status: err.status ,
				error: err.name ,
				message: err.message ,
			});
		}
	} else {
		console.error('Non-Operational Error!' , err);
		res.status(500).json({
			status: 'error' ,
			message: 'Something went very wrong!' ,
		})
	}
}

// Various Error Handlers:
const validationError = (err) => {
	const errorsObj = err.errors;
	const errors = Object.keys(errorsObj);
	let message = '';
	errors.forEach((error) => {
		message += errorsObj[error].message;
		message += ' ';
	});
	message = message.trim();
	err = new AppError(message , 400);
	err.name = 'Validation Error';
	return err;
}
const handleCastError = (err) => {
	const message = `Invalid ${err.path }: ${err.value }.`;
	err = new AppError(message , 400);
	err.name = 'Cast Error';
	return err;
}
const handleDuplicateFields = (err) => {
	const keys = Object.keys(err.keyValue);
	const message = `${keys } already exists!`;
	err = new AppError(message , 400);
	err.name = 'Duplicate Field Value Error';
	return err;
}
const handleJWTError = (err) => {
	return new AppError('Invalid Token. Please login again!' , 401);
}
const handleJWTExpiredError = (err) => {
	return new AppError('Your token has expired! Please login again!' , 401);
}

module.exports = (err , req , res , next) => {
	console.log('AppError: ' , err);
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		// send error:
		sendErrorDev(err , res);
	} else if (process.env.NODE_ENV === 'production') {
		// handle validation error:
		if (err.name === 'ValidationError') err = validationError(err);
		// handle cast error:
		if (err.name === 'CastError') err = handleCastError(err);
		// handle duplicate field entry error:
		if (err.code === 11000) err = handleDuplicateFields(err);
		// handle malformed jwt error:
		if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
		// handle jwt token expired error:
		if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err);
		// send error:
		sendErrorProd(err , res);
	}
}