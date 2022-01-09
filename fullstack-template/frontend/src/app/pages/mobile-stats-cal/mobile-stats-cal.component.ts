import { Component, OnInit } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { VoiceAssistantService } from 'src/app/global/services/assistant/voice-assistant.service';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'mobile-stats-cal',
  templateUrl: './mobile-stats-cal.component.html',
  styleUrls: ['./mobile-stats-cal.component.css']
})
export class MobileStatsCalComponent implements OnInit{

  constructor(private vas: VoiceAssistantService) {}

  ngOnInit(): void {
      this.vas.init();
  }
}
