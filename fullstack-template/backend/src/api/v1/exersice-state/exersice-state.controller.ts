import { Router, Request, Response, NextFunction } from 'express';
import { OnExersiceLogic } from './exersice-state.logic';

export class ExersiceStateController {

  public logic: OnExersiceLogic  = new OnExersiceLogic();

  public applyRoutes(): Router {
    const router = Router();

    router.get('/state', this.logic.getState, this.logic.getStateOnError);

    router.post('/stateUp', this.logic.incState, this.logic.getStateOnError);

    router.delete('/reset', this.logic.resetState, this.logic.getStateOnError);

    return router;
  }
}
