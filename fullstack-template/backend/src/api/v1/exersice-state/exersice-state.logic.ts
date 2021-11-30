import { Request, Response, NextFunction, Router } from 'express';

interface IStatusOptional {
  tmp: number;
}

interface IStatus {
  currExercise: IExercise;
  currSet: number;
  currRep: number;
  isPaused: boolean;
  timerStart?: Date;
  timerEnd?: Date;
  optional?: IStatusOptional;
}

interface IExerciseOptional {
  weightUsed: number[];
}

interface IExercise {
  name: string;
  type: string;
  sets?: number;
  reps?: number[];
  countDownTimeInSecs?: number;
  optional?: IExerciseOptional;
}

export class OnExersiceLogic {

  public exerciseArray: IExercise[] = [
    { name: 'Temporary 1' , type: 'Regular', sets: 3, reps: [12, 10, 8] },
    { name: 'Temporary 2' , type: 'Weights', sets: 4, reps: [10, 10, 8, 8] , optional: { weightUsed: []} },
    { name: 'Temporary 3' , type: 'CountDown', sets: 2, countDownTimeInSecs: 60 },
  ];

  public status: IStatus = {
    currExercise: this.exerciseArray[0],
    currSet: 0,
    currRep: 0,
    isPaused: false,
  };

  public getState(req: Request, res: Response, next: NextFunction) {
    // if error call next(new Error("error desc")) in order to call the function bellow
    const vr = this.status.currRep; // this will not run, execution will continue on getStateOnError
    res.send('ok');
  }

  public getStateOnError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.send('error');
  }
}
