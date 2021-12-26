import { Router, Request, Response, NextFunction } from 'express';
import { MediaLogic } from './media.logic';

export class MediaController {

  public logic: MediaLogic  = new MediaLogic();

  public applyRoutes(): Router {
    const router = Router();



    return router;
  }
}
