import pino from 'pino';

const pinoLogger = pino({
  name: 'sharing-tool-backend',
  level: 'debug',
});

export default pinoLogger;
