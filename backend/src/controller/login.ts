import { Request, Response } from 'express';
import Debug from 'debug';
import LoginService from '../service/login';
import BaseController from './base';

const debug = Debug('login:controller');

export default class LoginController extends BaseController {
  constructor(private readonly loginService: LoginService, private readonly development: boolean) {
    super();
  }

  authenticate(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error('missing auth');
      }
      const auth = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');
      const jwt = this.loginService.signToken(auth[0]);
      debug('Accessing login');
      return this.success(res, { jwt });
    } catch (error) {
      debug(error);
      return this.error(res, null, 401);
    }
  }

  logout(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error('missing auth');
      }
      const auth = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString();
      debug('Accessing logout');
      return this.success(res);
    } catch (error) {
      debug(error);
      return this.error(res, null, 401);
    }
  }
}
