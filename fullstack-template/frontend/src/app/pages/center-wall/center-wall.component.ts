import { Component, OnInit } from '@angular/core';
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

  constructor(/* private speakerService: SmartSpeakerService */) {}

  ngOnInit(): void {

    /* this.speakerService.addCommand(["hello"], () => {
      this.speakerService.speak("Hello");
    })

    this.speakerService.addSmartCommand(["car *"], (i, wildcard) => {
      console.log('hot '+ wildcard );
    }) */

    /* commit commands after some time, sometimes it does not */
    /* this.speakerService.commitCommands(); */
  }
}
