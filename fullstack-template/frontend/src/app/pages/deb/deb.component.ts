import { Component, OnInit } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'ami-fullstack-deb',
  templateUrl: './deb.component.html',
  styleUrls: ['./deb.component.css']
})
export class DebComponent implements OnInit {

  public currentExerciseState: IStatus;

  constructor(private exStateService: ExerciseStateService,
              private socketService: SocketsService) {

    this.currentExerciseState = {
      currExercise: { name: "No Data", type: "none"},
      exerciseNo: 0,
      currSet: 1,
      currRep: 0,
      condition: "ongoing",
    };
  }

  ngOnInit() {

    this.socketService.syncMessages("exercise-state").subscribe((msg) => {
      console.log(msg.message);
      this.currentExerciseState = msg.message;
    })


  }

  public fetchExState() {
    this.exStateService.fetchExerciseState().subscribe();
  }

  public upExState() {
    this.exStateService.upExerciseState().subscribe();
  }

  public resetExState() {
    this.exStateService.resetExerciseState().subscribe();
  }

}
