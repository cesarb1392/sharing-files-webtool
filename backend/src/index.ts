import Debug from 'debug';
import * as dotenv from 'dotenv';
import app from './config/app';

const index = () => {
  const debug = Debug('Index');
  dotenv.config({ path: '..' });

  try {
    app
      .listen(process.env.PORT, () => {
        debug('Starting App');
      })
      .on('listening', () => {
        debug(`Backend is listening on PORT : ${process.env.PORT}`);
      })
      .on('close', () => {
        debug('Server shutdown...');
      })
      .on('error', (error: { syscall: string; code: string }) => {
        if (error.syscall !== 'listen') {
          throw new Error('syscall is not listen');
        }
        switch (error.code) {
          case 'EACCES':
            throw new Error('Port requires elevated privileges.');
          case 'EADDRINUSE':
            throw new Error('Port is already in use.');
          default:
            throw new Error('Unknown ERROR');
        }
      });
  } catch (error) {
    debug(`MAIN ERROR :==> ${error}\n\n`);
    throw new Error(error);
  }
};

index();
