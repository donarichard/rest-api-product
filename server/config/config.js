const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').default("development"),
		PORT: Joi.number().default(8081),
		MONGODB_URL: Joi.string().description('Mongo DB url')
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGODB_URL,
		options: {
			useNewUrlParser: true,

			useUnifiedTopology: true
		}
	},
	MONGO_CONSTANTS: {
		CONNECTION_ERROR: 'Error in connecting Mongo',
		CONNECTION_SUCCESSFUL: 'Successfully connected to Mongo',
		CONNECTION_DISCONNECTED: 'Mongoose default connection is disconnected',
		PROCESS_TERMIATED:
			'The Application is terminated and all the Mongoose connection to the Database is disconnected',
		DISCONNECTED: 'disconnected',
		SIGINT: 'SIGINT'
	}
};
