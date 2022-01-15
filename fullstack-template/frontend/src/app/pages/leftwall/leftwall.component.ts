import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { VoiceAssistantService } from 'src/app/global/services/assistant/voice-assistant.service';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'leftwall',
  templateUrl: './leftwall.component.html',
  styleUrls: ['./leftwall.component.css']
})
export class LeftwallComponent implements OnInit{

  @ViewChild('bellAudioRef', {static: true}) bellAudioRef: ElementRef;

  constructor(private vas: VoiceAssistantService, private sock: SocketsService) {}

  ngOnInit(): void {
      //this.vas.init();

      this.sock.syncMessages('media/bell').subscribe((msg) => {
        this.playSound();
      })
  }

  playSound() {
    this.bellAudioRef.nativeElement.play();
  }

}
