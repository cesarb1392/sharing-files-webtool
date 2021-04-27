import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import helmet from 'helmet';
import PinoHttp from 'express-pino-logger';
import errorHandler from 'errorhandler';
import pinoLogger from '../util/logger';
import Router from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(PinoHttp({ logger: pinoLogger }));
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    return next();
  });
} else {
  app.use(lusca({
    csrf: true,
    csp: {
      policy: {
        'default-src': "'none'",
        'script-src': "'self' ",
        'manifest-src': "'self' ",
        'style-src': "'self' ",
        'connect-src': "'self'",
        'img-src': "'self'",
        'font-src': "'self'",
      },
    },
    xframe: 'SAMEORIGIN',
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    xssProtection: true,
    nosniff: true,
    referrerPolicy: 'same-origin',
  }));
  app.use(compression());
}
// app.use(Headers);
Router.getPaths(app);

export default app;
