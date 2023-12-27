import express from 'express';
import cors from 'cors';
import morgan from '../config/morgan';
import config from '../config/config';
import helmet from 'helmet';
import router from '../routers';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
const app = express();

if (config.env === 'development') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());
// use routes
app.use('/api/v1', router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
