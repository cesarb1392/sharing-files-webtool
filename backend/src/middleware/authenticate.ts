import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

const authenticateJWT = (req: Request & { user: unknown }, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
      if (err) {
        throw new Error('can not verify user');
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
export default authenticateJWT;
