import { Component, OnInit } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { VoiceAssistantService } from 'src/app/global/services/assistant/voice-assistant.service';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'mobile-onworkout',
  templateUrl: './mobile-onworkout.component.html',
  styleUrls: ['./mobile-onworkout.component.css']
})
export class MobileOnworkoutComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
  }
}
