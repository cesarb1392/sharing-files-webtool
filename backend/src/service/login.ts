import Debug from 'debug';
import * as jwt from 'jsonwebtoken';

const debug = Debug('login:service');

export default interface LoginService {
  signToken(username: string): string;
}

export class LoginServiceImpl implements LoginService {
  signToken(username: string): string {
    debug('signing token');
    return jwt.sign({ username, role: 'admin' }, process.env.TOKEN_SECRET as string, {
      expiresIn: '7d',
    });
  }
}
