import { Application, Response, Request } from 'express';
import Debug from 'debug';

const debug = Debug('routes');

export default class Router {
  static getPaths(app: Application) {
    app.get('/', (req: Request, res: Response) => {
      try {
        debug(`Accessing homepage, from: ${req}`);
        return res.sendStatus(200);
      } catch (error) {
        debug(JSON.stringify(error));
        return res.sendStatus(500);
      }
    });
  }
}
