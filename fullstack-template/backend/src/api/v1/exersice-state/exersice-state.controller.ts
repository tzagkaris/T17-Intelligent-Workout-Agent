import { Router, Request, Response, NextFunction } from 'express';
import { OnExersiceLogic } from './exersice-state.logic';

export class ExersiceStateController {

  public logic: OnExersiceLogic  = new OnExersiceLogic();

  public applyRoutes(): Router {
    const router = Router();

    router.get('/start', this.logic.signalWorkoutStart, this.logic.getStateOnError)

    router.get('/end', this.logic.signalWorkoutEnd, this.logic.getStateOnError)

    router.get('/pause', this.logic.signalWorkoutPause, this.logic.getStateOnError)

    router.post('/state', this.logic.getState, this.logic.getStateOnError);

    router.post('/stateUp', this.logic.incState, this.logic.getStateOnError);

    router.post('/chageReps', this.logic.changeReps, this.logic.getStateOnError);

    router.post('/chageTime', this.logic.changeTime, this.logic.getStateOnError);

    router.delete('/reset', this.logic.resetState, this.logic.getStateOnError);

    router.get('/exersices', this.logic.getExersiceArray, this.logic.getStateOnError);

    return router;
  }
}
