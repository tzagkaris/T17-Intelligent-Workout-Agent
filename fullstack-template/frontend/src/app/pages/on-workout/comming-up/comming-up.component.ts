import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(public exService: ExerciseStateService) {

  }

  finalArray: IFinalEx[] = [];

  workoutImagePaths: String[] = [
    './../../assets/bicepcurls.png',
    './../../assets/bicepcurls.png',
    './../../assets/bicepcurls.png'
  ]

  ngAfterViewInit(): void {

    this.exService.getExersiceArray().subscribe(
      (result: IExercise[]) => {
        this.getFinalExersiceArray(result);
      }
    )
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

      if(elem.sets && elem.reps) {
        finalArrayEntry.rs = `${elem.sets} x `;
        elem.reps.forEach((rep) => {
          finalArrayEntry.rs = finalArrayEntry.rs.concat(`${rep} - `);
        })
      }
      else {
        finalArrayEntry.rs = "TODO";
      }

      finalArrayEntry.imageRef = this.workoutImagePaths[index];
      finalArrayEntry.index = index;
      
      this.finalArray.push(finalArrayEntry);
    })

  }

}
