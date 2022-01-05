import { HttpHandler } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMusicState, MediaService } from 'src/app/global/services/media/media.service';

/**
 * TODO
 * Make component dynamic
*/


@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, AfterViewInit {

  @ViewChild('audioElement', {static: true}) audioRef: ElementRef;
  audio: HTMLAudioElement;

  cState: IMusicState = {
    status: 'paused',
    index: -1,
    volume: .2,
    song: { /* placeholder */
      name: 'None Playing',
      artist: 'no info',
      duration: '--:--',
      filepath: ''
    }
  };

  constructor(private media: MediaService, private sock: SocketsService) {}

  ngOnInit(): void {
    this.audio = this.audioRef.nativeElement;

  }

  ngAfterViewInit(): void {

    this.sock.syncMessages('music/state')
    .subscribe((state) =>{
      this.handleNewState(state.message);
    });

    this.audio.addEventListener('ended', () => {
      this.media.nextTrack().subscribe((res) => {
        this.audio.play();
      });
    })
  }

  public handleNewState(state: IMusicState) {

    /* if no song is selected will try to change to first song */
    if(!this.handleNextSong(state)) return;

    /* check pause/play if status changed */
    if(state.status == 'paused')
    this.handlePause(state);
    else if(state.status == 'playing')
    this.handlePlay(state);

    this.handleVolumeChange(state);
      /* set the current state */
      this.cState = state;
  }

  public handlePause(newState: IMusicState) {

    this.audio.pause();
  }

  public handlePlay(state: IMusicState) {
    console.log(1);
    this.audio.play();
  }

  public handleVolumeChange(state: IMusicState) {
    let playing = false;
    if(this.isAudioPlaying()) playing = true;

    this.audio.volume = state.volume;

    if(playing) this.audio.play();
  }

  public handleNextSong(state: IMusicState) {

    /* check if song was chanded */
    if(state.index == -1) {
      this.media.nextTrack().subscribe();
      return 0;
    }

    this.audio.src = state.song.filepath;

    return 1;
  }

  isAudioPlaying = () => {
    return !!(this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2);
  }

}
