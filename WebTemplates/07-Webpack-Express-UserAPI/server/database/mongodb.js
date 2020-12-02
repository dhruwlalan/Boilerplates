const mongoose = require('mongoose');

module.exports = {
	connect: () => {
		mongoose.connect(process.env.MDB_ATLAS , {
			useNewUrlParser: true ,
			useCreateIndex: true ,
			useFindAndModify: false ,
			useUnifiedTopology: true ,
		}).then(() => { console.log('DB Connection Successful!') })
		.catch((e) => { console.log('DB Connection Unsuccessful! Error: ' , e.message) });
	}
}