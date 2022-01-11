import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { isElement } from 'lodash';
import { IExercise, IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

export interface IFinalEx {
  name: String;
  rs: String;
  imageRef: String;
  index: number;
}

@Component({
  selector: 'comming-up',
  templateUrl: './comming-up.component.html',
  styleUrls: ['./comming-up.component.css']
})
export class CommingUpComponent implements AfterViewInit {

  constructor(public exService: ExerciseStateService,
    private socketService: SocketsService) {

  }

  finalArray: IFinalEx[] = [];

  allExercises: IExercise[] = [];
  @Output() removeMe = new EventEmitter();

  ngAfterViewInit(): void {

    this.exService.getExersiceArray().subscribe(
      (result: IExercise[]) => {
        this.allExercises = result;
        this.getFinalExersiceArray(result);
      }
    )

    this.socketService.syncMessages("exercise-state").subscribe((msg) => {

      if(!this.finalArray.length) {
        setTimeout(() => {
          this.filterFinalExersiceArray(msg.message);
        }, 1000)
      } else this.filterFinalExersiceArray(msg.message);

    })
  }

  filterFinalExersiceArray = (state: IStatus) => {

    this.finalArray.forEach(elem => {
      if(elem.index <= state.exerciseNo)
        this.finalArray = this.finalArray.filter(fl => fl.index != elem.index);
    })

    if(!this.finalArray.length) {
      console.log(1)
      this.removeMe.emit(1);
    }
  }

  getFinalExersiceArray = (originalArray: IExercise[]) => {

    originalArray.forEach((elem, index)=> {

      let finalArrayEntry: IFinalEx = {
        name: "none",
        rs: 'none',
        imageRef: 'none',
        index: 0
      };

      finalArrayEntry.name = elem.name;
      finalArrayEntry.imageRef = elem.imageRef;

      if(elem.sets && elem.reps) {
        finalArrayEntry.rs = `${elem.sets} x `;
        elem.reps.forEach((rep) => {
          finalArrayEntry.rs = finalArrayEntry.rs.concat(`${rep} - `);
        })
        /* remove the last 2 elements of the rs */
        finalArrayEntry.rs = finalArrayEntry.rs.substring(0, finalArrayEntry.rs.length - 2);
      }
      else if(elem.sets && elem.countDownTimeInSecs){
        finalArrayEntry.rs = `${elem.sets} x ${elem.countDownTimeInSecs} s`;
      }

      finalArrayEntry.index = index;

      this.finalArray.push(finalArrayEntry);
    })

  }

}
