import { state } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMusicState, MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {

  constructor(private media: MediaService,
    private sock: SocketsService) {}

  @ViewChild("prevButton", {static: false}) prevButtonRef: ElementRef;
  @ViewChild("playbackButton", {static: false}) playbackButtonRef: ElementRef;
  @ViewChild("nextButton", {static: false}) nextButtonRef: ElementRef;

  prevButton: HTMLImageElement;
  playbackButton: HTMLImageElement;
  nextButton: HTMLImageElement;

  cStatus: IMusicState;

  ngAfterViewInit(): void {

    this.prevButton = this.prevButtonRef.nativeElement;
    this.nextButton = this.nextButtonRef.nativeElement;
    this.playbackButton = this.playbackButtonRef.nativeElement;

    this.media.getMusicState().subscribe(r => {
      this.cStatus = r;
      this.handleNewState(r);
    });

    this.sock.syncMessages('music/state')
    .subscribe((nState: any)=> this.handleNewState(nState.message))
  }

  handleNewState = (state: IMusicState) => {

    this.cStatus = state;

    if(state.status == "playing") {
      this.playbackButton.src = './../../../../assets/pause.svg';
    }
    else {
      this.playbackButton.src = './../../../../assets/play.svg';
    }
  }

  togglePlayback = () => {

    if(this.cStatus.status == "playing") this.media.setMusicPaused().subscribe()
    else this.media.setMusicPlaying().subscribe()
  }

  playAgain = () => {

    this.media.setMusicPaused().subscribe()
    setTimeout(
      () => this.media.setMusicPlaying().subscribe()
      , 500)
  }

  playNext = () => {
    this.media.nextTrack().subscribe()
  }
}
