const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

/*Setup Template Engine*/
exports.setupTemplateEngin = (app) => {
	app.set('view engine' , 'pug');
	app.set('views' , path.join(__dirname , '../views'));
}

/*Serve Static Files*/
exports.serverStaticFiles = (app) => {
	app.use(express.static(path.join(__dirname , '../../public')));
}

/*Use the BodyParser & CookieParser*/
exports.useParsers = (app) => {
	app.use(express.json({ limit: '10kb' }));
	app.use(cookieParser());
}

/*G-Zip Responses*/
exports.gzipResponses = (app) => {
	app.use(compression());
}