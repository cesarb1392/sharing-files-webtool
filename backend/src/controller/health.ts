import { Request, Response } from 'express';
import Debug from 'debug';
import BaseController from './base';

const debug = Debug('health:controller');

export default class HealthController extends BaseController {
  anyPath(req: Request, res: Response) {
    try {
      debug('Accessing anyPath');
      return this.success(res);
    } catch (error) {
      debug(error);
      return this.error(res, null, 500);
    }
  }

  ping(req: Request, res: Response) {
    try {
      debug('Accessing /health');
      return this.success(res);
    } catch (error) {
      debug(error);
      return this.error(res, null, 500);
    }
  }
}
