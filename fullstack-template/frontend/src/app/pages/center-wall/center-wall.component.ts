import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';

@Component({
  selector: 'center-wall',
  templateUrl: './center-wall.component.html',
  styleUrls: ['./center-wall.component.css']
})
export class CenterWallComponent implements OnInit {

  constructor(private sock: SocketsService,
                          private router: Router) {}

  ngOnInit(): void {

    this.sock.syncMessages('exercise/start').subscribe(msg => {

      this.router.navigateByUrl('/on-workout');
    })

  }
}
