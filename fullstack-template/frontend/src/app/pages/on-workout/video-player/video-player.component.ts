import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterViewInit {

  @Input() videoSource: Observable<String>;
  @Input() videoLoop: Boolean;
  @Input() canBeClosed: Boolean;

  @ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;
  @ViewChild('videoControls', {static: true}) videoControls: ElementRef;
  @ViewChild('controlMute', {static: true}) controlMute: ElementRef;
  @ViewChild('controlPause', {static: true}) controlPause: ElementRef;
  @ViewChild('controlClose', {static: true}) controlClose: ElementRef;

  @Output() closeVideo = new EventEmitter();

  constructor() {}

  ngAfterViewInit(): void {
    let video = this.videoPlayer.nativeElement;

    // add video source as specified at @Input
    this.videoSource.subscribe((src) => {
      video.setAttribute('src', src);
    })

    // mute and loop video by default
    video.muted = 1;

    // loop video if specified at @Input
    if(this.videoLoop) video.loop = true;

    video.play();
  }

  toggleControls = () => {
    let controls = this.videoControls.nativeElement;
    controls.classList.toggle('hide-me');

    setTimeout(() => {
      controls.classList.toggle('hide-me')
    }, 5000);
  }

  muteUnmuteVideo = () => {
    let soundBtn = this.controlMute.nativeElement;
    let video = this.videoPlayer.nativeElement;

    if(video.muted)
      soundBtn.setAttribute('src', "./../../../../assets/player-sound.svg")
      else
      soundBtn.setAttribute('src', "./../../../../assets/player-mute.svg")

    video.muted = !video.muted;
  }

  startStopVideo = () => {
    let video = this.videoPlayer.nativeElement;
    let pauseBtn = this.controlPause.nativeElement;

    if(video.paused || video.ended) {
      video.play();
      pauseBtn.setAttribute('src', "./../../../../assets/player-pause.svg")
    }
      else {
        video.pause();
        pauseBtn.setAttribute('src', "./../../../../assets/player-play.svg")
      }
  }

  onCloseVideo = () => {
    let video = this.videoPlayer.nativeElement;

    video.pause();
    this.closeVideo.emit('close');
  }
}
