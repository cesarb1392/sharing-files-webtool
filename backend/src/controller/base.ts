import { Response } from 'express';

export default abstract class BaseController {
  public success(res: Response, data?: any): Response {
    if (data) {
      res.type('application/json');
      return res.status(200).json(data);
    }
    return res.sendStatus(200);
  }

  public error(res: Response, data?: any, statusCode?: number): Response {
    if (data) {
      res.type('application/json');
      return res.status(statusCode || 400).json(data);
    }
    return res.sendStatus(statusCode || 400);
  }
}
