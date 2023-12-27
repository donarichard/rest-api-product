import dotEnv from 'dotenv';
import config from './config/config';
import app from './bin/app';
import logger from './config/logger';
import { connector } from './db';
import cluster from 'cluster';
import os from 'os';

dotEnv.config();

let server;

//connection for mongodb
connector();

//cluster load balancer
if (cluster.isMaster && config.env !== 'development') {
	logger.info(`Master ${process.pid} is running`);
	const numCPUs = os.cpus().length;
	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	// Check if work id is died
	cluster.on('exit', worker => {
		logger.error(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	server = app.listen(config.port, () => {
		logger.info(`Listening to port ${config.port}`);
	});
}

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = error => {
	logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
