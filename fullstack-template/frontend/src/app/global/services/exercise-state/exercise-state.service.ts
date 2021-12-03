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

  public fetchExerciseState() {

    return this.http.post(`${this.hostURI}/api/exercise/state`, { event: "exercise-state"});
  }

  public upExerciseState() {

    return this.http.post(`${this.hostURI}/api/exercise/stateUp`, { event: "exercise-state"});
  }

  public resetExerciseState() {

    return this.http.delete(`${this.hostURI}/api/exercise/reset`);
  }
}
