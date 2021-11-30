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

  public exerciseArray: IExercise[] = [
    { name: 'Temporary 1' , type: 'Regular', sets: 3, reps: [12, 10, 8] },
    { name: 'Temporary 2' , type: 'Weights', sets: 4, reps: [10, 10, 8, 8] , optional: { weightUsed: []} },
    { name: 'Temporary 3' , type: 'CountDown', sets: 2, countDownTimeInSecs: 60 },
  ];

  public status: IStatus = {
    currExercise: this.exerciseArray[0],
    exerciseNo: 0,
    currSet: 1,
    currRep: 0,
    condition: "ongoing",
  };

  public getState = (req: Request, res: Response, next: NextFunction) => {
    // if error call next(new Error("error desc")) in order to call the function bellow

    this.broadcastState(req.body.event);
    res.send({ requestStatus: 'ok' });
  }

  public incRep = (req: Request, res: Response, next: NextFunction) => {
    // try to increase currRep by one, if rep is capped try to increase currSet by one and
    // if set is capped change current exercise. If this is the last exercise change the workout condicion to finished.

    if(this.status.condition = "finished") res.send('ok');

    switch(this.status.currExercise.type) {
      case 'Regular':
      case 'Weights':
        this.incRepRegular();
        break;

      case 'CountDown':
        this.incRepCountDown();
        break;
    }

    this.broadcastState(req.body.event);
    res.send({ requestStatus: 'ok' });
  }

  public incRepRegular = () => {
    const exCap = this.exerciseArray.length;
    const cSet = this.status.currSet;
    const cRep = this.status.currRep;
    const exNo = this.status.exerciseNo;

    let repsCapped:boolean = false;
    let setsCapped:boolean = false;
    let exCapped:boolean = false;

    // check if reps are capped
    if(cRep === this.status.currExercise.reps[cSet] - 1)
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
  }

  public incRepCountDown = () => {
    
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

  }

  public getStateOnError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send('error');  // may do something fancy later on
  }

  public broadcastState = (event: string) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast(event, this.status);
  }
}
