const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../configs/webpack.start.js');
const compiler = webpack(config);

module.exports = (app) => {
	/*Hook webpack-dev-middleware with hot reload*/
	if (process.env.FENV === 'development') {
		app.use(webpackDevMiddleware(compiler));
		app.use(webpackHotMiddleware(compiler));
	}
	/*Inject Bundles */
	if (process.env.FENV === 'production') {
		let bundle = {};
		const publicDir = path.join(__dirname, '../../public');
		fs.readdir(publicDir , async (err , files) => {
			if (err) return console.log('Unable to scan directory: ' + err);
			let assetsName = await files.map((file) => file.split('.')[0]);
			await files.forEach((file , i) => {
				bundle = Object.defineProperty(bundle, assetsName[i] , {
					value: files[i] ,
					writable: true ,
				    enumerable: true ,
				});
			});
		});
		app.use((req, res, next) => {
			res.locals.bundle = bundle
			next();
		});
	}
}