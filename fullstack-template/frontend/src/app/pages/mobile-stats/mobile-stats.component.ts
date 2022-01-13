import { Component, OnInit } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';

import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'mobile-stats',
  templateUrl: './mobile-stats.component.html',
  styleUrls: ['./mobile-stats.component.css']
})
export class MobileStatsComponent {


 


  constructor() {}

  ngOnInit(): void {
  }
 
}
