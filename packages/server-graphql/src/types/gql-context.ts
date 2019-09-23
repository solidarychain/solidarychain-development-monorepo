import { Request, Response } from 'express';
import { GqlContextPayload } from '.';

export interface GqlContext {
  req: Request;
  res: Response;
  payload?: GqlContextPayload;
}