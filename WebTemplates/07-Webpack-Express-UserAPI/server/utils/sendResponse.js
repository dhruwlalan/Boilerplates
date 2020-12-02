
module.exports = (res , statusCode , data , results) => {
	responseObj = { status: 'success' };
	if (results) responseObj.results = results;
	responseObj.data = data;
	res.status(statusCode).json(responseObj);
};