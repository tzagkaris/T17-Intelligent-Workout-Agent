import { DIContainer, SocketsService } from '@app/services';
import { Request, Response, NextFunction, Router } from 'express';

interface IStatusOptional {
  tmp: number;
}

interface IStatus {
  currExercise: IExercise;
  exerciseNo: number;
  currSet: number;
  currRep: number;
  condition: string;
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

  /* this is the array of exercises */
  public exerciseArray: IExercise[] = [
    { name: 'Temporary 1' , type: 'Regular', sets: 3, reps: [12, 10, 8] },
    { name: 'Temporary 2' , type: 'Weights', sets: 4, reps: [10, 10, 8, 8] , optional: { weightUsed: []} },
    { name: 'Temporary 3' , type: 'CountDown', sets: 2, countDownTimeInSecs: 60 },
  ];

  /* this is the current status */
  public status: IStatus = {
    currExercise: this.exerciseArray[0],
    exerciseNo: 0,
    currSet: 1,
    currRep: 0,
    condition: "not started",
  };

  public getExersiceArray = (req: Request, res: Response, next: NextFunction) => {

    res.send(this.exerciseArray);
  }

  public getState = (req: Request, res: Response, next: NextFunction) => {
    // if error call next(new Error("error desc")) in order to call the function bellow

    this.broadcastState(req.body.event);
    res.send(this.status);
  }

  public incState = (req: Request, res: Response, next: NextFunction) => {

    if(this.status.condition == "finished") {

      res.send('ok');
      return;
    }
    let finished: string| undefined = undefined;
    switch(this.status.currExercise.type) {


      case 'Regular':
      case 'Weights':
        finished = this.incRepRegular();
        break;

      case 'CountDown':
        finished = this.incRepCountDown();
        break;
    }
    /*  */

    this.broadcastState(req.body.event);

    if(finished) this.broadcastWorkoutEnd();
    res.send(this.status);
  }

  public resetState = (req: Request, res: Response, next: NextFunction) => {

    this.status = {
      currExercise: this.exerciseArray[0],
      exerciseNo: 0,
      currSet: 1,
      currRep: 0,
      condition: "not started",
    };

    this.broadcastState("exercise-state");
    res.status(200).send();
    return;
  }











  public incRepRegular = (): string | undefined => {
    const exCap = this.exerciseArray.length;
    const cSet = this.status.currSet;
    const cRep = this.status.currRep;
    const exNo = this.status.exerciseNo;

    let repsCapped:boolean = false;
    let setsCapped:boolean = false;
    let exCapped:boolean = false;

    // check if reps are capped
    if(cRep === this.status.currExercise.reps[cSet - 1] - 1)
      repsCapped = true;

    // check if sets are capped
    if(cSet === this.status.currExercise.sets)
      setsCapped = true;

    // check if exNo is capped ( we in the last exercise )
    if(exNo === exCap - 1 )
      exCapped = true;

    // workout is finished
    if(repsCapped && setsCapped && exCapped) {

      this.status.condition = 'finished';
      return this.status.condition;
    }
    // next exercise
    else if(repsCapped && setsCapped && !exCapped) {

      ++this.status.exerciseNo;
      this.status.currExercise = this.exerciseArray[exNo + 1];
      this.status.currRep = 0;
      this.status.currSet = 1;
    }
    // next Set
    else if(repsCapped && !setsCapped) {

      ++this.status.currSet;
      this.status.currRep = 0;
    }
    // next Rep
    else
      ++this.status.currRep;

      return undefined;
  }

  public incRepCountDown = (): string | undefined => {

    const exCap = this.exerciseArray.length;
    const cSet = this.status.currSet;
    const exNo = this.status.exerciseNo;

    let setsCapped:boolean = false;
    let exCapped:boolean = false;

    // check if sets are capped
    if(cSet === this.status.currExercise.sets)
      setsCapped = true;

    // check if exNo is capped ( we in the last exercise )
    if(exNo === exCap - 1 )
      exCapped = true;

    // workout is finished
    if(setsCapped && exCapped) {

      this.status.condition = 'finished';
      return this.status.condition;
    }
    // next exercise
    else if(setsCapped && !exCapped) {

      ++this.status.exerciseNo;
      this.status.currExercise = this.exerciseArray[exNo + 1];
      this.status.currSet = 1;
    }
    // next Set
    else
      ++this.status.currSet;

    return undefined;
  }

  /* this will just send a broadcast on on-workout to change the specific set reps. */
  /* If set does not have reps this will be ignored in frontend */
  public changeReps = (req: Request, res: Response, next: NextFunction) => {

    if(!req.body.newReps) {
      next('no newReps found in request.');
      return;
    }

    let newReps = parseInt(req.body.newReps);
    if(newReps < 1 || newReps > 50) {
      next('invalid newReps range.');
      return;
    }

    this.broadcastNewReps(newReps);
    res.status(200).send();
  }

  public changeTime = (req: Request, res: Response, next: NextFunction) => {

    if(!req.body.newTime) {
      next('no newTime found in request');
      return;
    }

    let newTime = parseInt(req.body.newTime);
    if(newTime < 0 || newTime > 500) {
      next('invalid newTime range');
      return;
    }

    this.broadcastNewTime(newTime);
    res.status(200).send();
  }

  public signalWorkoutStart = (req: Request, res: Response, next: NextFunction) => {

    this.broadcastWorkoutStart();
    res.status(200).send();
  }

  public signalWorkoutEnd = (req: Request, res: Response, next: NextFunction) => {

    this.broadcastWorkoutEnd();
    res.status(200).send();
  }

  public signalWorkoutPause = (req: Request, res: Response, next: NextFunction) => {

    this.broadcastWorkoutPause();
    res.status(200).send();
  }

  public getStateOnError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send({'error' : err});
  }

  public broadcastState = (event: string) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast(event, this.status);
  }

  public broadcastWorkoutStart = () => {

    this.status.condition = 'on workout';

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('exercise/start', this.status.condition);
  }

  public broadcastWorkoutEnd = () => {

    this.status.condition = 'finished';

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('exercise/end', this.status.condition);
  }

  public broadcastWorkoutPause = () => {


    const cs = DIContainer.get(SocketsService);
    cs.broadcast('exercise/pause', this.status.condition);
  }

  public broadcastNewReps = (newReps: number) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('exercise/changeReps', newReps);
  }

  public broadcastNewTime = (newTime: number) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('exercise/changeTime', newTime);
  }
}
