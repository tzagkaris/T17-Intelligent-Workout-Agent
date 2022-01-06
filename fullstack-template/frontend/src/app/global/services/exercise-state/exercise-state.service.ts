import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExerciseStateService {

  private hostURI: string;

  constructor(private http:HttpClient) {
    this.hostURI = environment.host;
  }

  /* call this to inform center-wall to go to on-workout screen */
  public startWorkout() {

    return this.http.get(`${this.hostURI}/api/exercise/start`);
  }

  /* call this to inform on-workout to abort and return to center wall */
  public endWorkout() {
    return this.http.get(`${this.hostURI}/api/exercise/end`);
  }

  public pauseWorkout() {
    return this.http.get(`${this.hostURI}/api/exercise/pause`);
  }

  public fetchExerciseState() {
    return this.http.post(`${this.hostURI}/api/exercise/state`, { event: "exercise-state"});
  }

  public upExerciseState() {

    return this.http.post(`${this.hostURI}/api/exercise/stateUp`, { event: "exercise-state"});
  }

  public resetExerciseState() {

    return this.http.delete(`${this.hostURI}/api/exercise/reset`);
  }

  public getExersiceArray() {

    return this.http.get(`${this.hostURI}/api/exercise/exersices`);
  }

  public newReps(newReps: number) {
    
    return this.http.post(`${this.hostURI}/api/exercise/chageReps`, {newReps: newReps});
  }

  public newTime(newTime: number) {

    return this.http.post(`${this.hostURI}/api/exercise/chageTime`, {newTime: newTime})
  }
}
