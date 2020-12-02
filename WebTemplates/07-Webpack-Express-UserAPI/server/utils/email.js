const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {

	constructor (user , url) {
		this.from = `UserAPI <${process.env.EMAIL_FROM }>`;
		this.to = user.email;
		this.url = url;
	}

	transporter() {
		if (process.env.NODE_ENV === 'production') {
			return nodemailer.createTransport({
				service: 'gmail' ,
				auth: {
					user: process.env.GMAIL_FROM ,
					pass: process.env.GMAIL_PASSWORD ,
				}
			});
		} else {
			return nodemailer.createTransport({
				host: process.env.MT_HOST ,
				port: process.env.MT_PORT ,
				auth: {
					user: process.env.MT_USER ,
					pass: process.env.MT_PASS ,
				}
			});
		}
	}
	
	async send () {
		const html = pug.renderFile(`${__dirname }/../views/resetPasswordEmail.pug` , {
			url: this.url ,
		});
		const mailOptions = {
			from: this.from ,
			to: this.to ,
			subject: 'Your password reset token (valid for 10 min)' ,
			html ,
			text: htmlToText.fromString(html) ,
		}
		await this.transporter().sendMail(mailOptions);
	}
}