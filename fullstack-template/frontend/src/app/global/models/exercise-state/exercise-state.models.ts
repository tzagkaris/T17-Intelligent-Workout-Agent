/*
 * BACKEND INTERFACES AND STRUCTURES
 */

export interface IStatusOptional {
  tmp: number;
}

export interface IStatus {
  currExercise: IExercise;
  exerciseNo: number;
  currSet: number;
  currRep: number;
  condition: string;
  timerStart?: Date;
  timerEnd?: Date;
  optional?: IStatusOptional;
}

export interface IExerciseOptional {
  weightUsed: number[];
}

export interface IExercise {
  name: string;
  type: string;
  vpath: string;
  sets?: number;
  reps?: number[];
  countDownTimeInSecs?: number;
  optional?: IExerciseOptional;
}

/*
 * FRONTEND INTERFACES AND STRUCTURES
 */
