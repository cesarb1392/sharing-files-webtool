import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import PinoHttp from 'express-pino-logger';
import errorHandler from 'errorhandler';
import pinoLogger from '../util/logger';
import Router from './routes';
import Headers from '../middleware/headers';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(PinoHttp({ logger: pinoLogger }));
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
}

app.use(Headers);
Router.getPaths(app);

export default app;
