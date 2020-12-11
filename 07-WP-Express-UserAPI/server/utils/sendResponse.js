module.exports = (res, statusCode, data, results) => {
   const responseObj = { status: 'success' };
   if (results) responseObj.results = results;
   responseObj.data = data;
   res.status(statusCode).json(responseObj);
};
