import { Component, OnInit } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { VoiceAssistantService } from 'src/app/global/services/assistant/voice-assistant.service';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'mobile-calendar',
  templateUrl: './mobile-calendar.component.html',
  styleUrls: ['./mobile-calendar.component.css']
})
export class MobileCalendarComponent implements OnInit{

  constructor(private vas: VoiceAssistantService) {}

  ngOnInit(): void {
      this.vas.init();
  }
}