import mongoose from 'mongoose';
import config, { MONGO_CONSTANTS } from '../config/config';
import logger from '../config/logger';

// database connection
export const connector = async () => {
	try {
		await mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
			logger.info(`${MONGO_CONSTANTS.CONNECTION_SUCCESSFUL}`);
		});
	} catch (err) {
		logger.error(`${MONGO_CONSTANTS.CONNECTION_ERROR}`, err);
	}
};

let db = mongoose.connection;

db.on(MONGO_CONSTANTS.DISCONNECTED, () => {
	console.info(`${MONGO_CONSTANTS.CONNECTION_DISCONNECTED}`);
});

// Stopping all the open connection of database when the process is stopped.
process.on(MONGO_CONSTANTS.SIGINT, () => {
	mongoose.connection.close(() => {
		console.info(`${MONGO_CONSTANTS.PROCESS_TERMIATED}`);
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});
});
