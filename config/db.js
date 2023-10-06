const mongoose = require('mongoose');
const debug = require('debug')('members-only:database');

module.exports = async function connectDB() {
	const uri = process.env.MONGO_URI;

	try {
		mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		debug(err.message);
		process.exit(1);
	}

	const dbConnection = mongoose.connection;
	dbConnection.once('open', (_) => {
		debug(`Database connected: ${uri}`);
	});

	dbConnection.on('error', (err) => {
		debug(`connection error: ${err}`);
	});
};
