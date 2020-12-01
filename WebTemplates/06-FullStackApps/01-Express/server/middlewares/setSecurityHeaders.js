const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

/* ** Setup Security Middlewares ** */
module.exports = (app) => {
	// 1 trust x-forworded-for header attribute
	app.enable('trust proxy');
	// 2 enable cross-origin resource sharing
	app.use(cors());
	app.options('*' , cors());
	// 3 setup some security http headers
	app.use(helmet());
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
			baseUri: ["'self'"],
			fontSrc: ["'self'", 'https:', 'http:', 'data:'],
			scriptSrc: ["'self' 'unsafe-eval'", 'https:', 'http:', 'blob:'],
			styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
		},
	}));
}