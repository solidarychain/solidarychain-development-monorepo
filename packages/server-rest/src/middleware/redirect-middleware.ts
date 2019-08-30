import { NextFunction, Request, Response } from 'express';
import { envVariables as e } from '../env';

// custom redirect middleware
export const redirectMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!/https/.test(req.protocol)) {
    const redirectUrl = `https://${req.hostname}:${e.httpsPort}${req.originalUrl}`;
    res.redirect(redirectUrl);
  } else {
    return next();
  }
};
