import { HttpHandler } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMusicState, ISong, MediaService } from 'src/app/global/services/media/media.service';

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

  @ViewChild('prevButton', {static: true}) prevButtonRef: ElementRef;
  @ViewChild('nextButton', {static: true}) nextButtonRef: ElementRef;
  @ViewChild('playbackButton', {static: true}) playbackButtonRef: ElementRef;
  prevButton: HTMLImageElement;
  nextButton: HTMLImageElement;
  playbackButton: HTMLImageElement;

  @ViewChild('discRef', {static: true}) discRef: ElementRef;
  disc: HTMLImageElement;

  cState: IMusicState = {
    status: 'paused',
    index: -1,
    volume: .2,
    song: { /* placeholder */
      name: 'Lose Yourself',
      artist: 'Eminem',
      duration: '05:21',
      filepath: ''
    }
  };

  songList: ISong[] = [];
  /* placeholders in case of backend problems */
  currentShowSongList: ISong[] =
  [
    {name: 'Lose Yourself', artist: 'Eminem', duration: '5:21', filepath: './../../../../assets/music/Eminem - Lose Yourself.mp3'},
    {name: 'Venom', artist: 'Eminem', duration: '4:31', filepath: './../../../../assets/music/Eminem - Venom.mp3'},
    {name: 'Without Me', artist: 'Eminem', duration: '4:52', filepath: './../../../../assets/music/Eminem - Without Me.mp3'}
  ];

  constructor(private media: MediaService, private sock: SocketsService) {}

  ngOnInit(): void {
    this.audio = this.audioRef.nativeElement;
  }

  ngAfterViewInit(): void {

    this.prevButton = this.prevButtonRef.nativeElement;
    this.nextButton = this.nextButtonRef.nativeElement;
    this.playbackButton = this.playbackButtonRef.nativeElement;
    this.disc = this.discRef.nativeElement;

    this.media.getMusicTrackList().subscribe(songs => {
      this.songList = songs;
    })

    this.media.getMusicState().subscribe(r => {
      this.handleNewState(r)
      this.filterSongList(r)
    })

    this.sock.syncMessages('music/state')
    .subscribe((state) =>{
      this.handleNewState(state.message);
      this.filterSongList(state.message)
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

    this.playbackButton.src = "./../../../../assets/play-dark.svg";
    this.audio.pause();
    this.disc.classList.remove('spinning_disc');
  }

  public handlePlay(state: IMusicState) {

    this.playbackButton.src = "./../../../../assets/pause.png";
    this.audio.play();
    this.disc.classList.add('spinning_disc');
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

  prevSong = () => {

    this.media.setMusicPaused().subscribe();
    setTimeout(() => this.media.setMusicPlaying().subscribe(), 500)
  }

  togglePlayback = () => {

    if(this.cState.status == "paused")
      this.media.setMusicPlaying().subscribe()
    else
      this.media.setMusicPaused().subscribe()
  }

  nextSong = () => {

    this.media.nextTrack().subscribe()
  }

  filterSongList = (state: IMusicState) => {

    let start_Index = state.index;

    this.currentShowSongList = []
    this.currentShowSongList.push(
      this.songList[start_Index % 6],
      this.songList[(start_Index+1) % 6],
      this.songList[(start_Index+2) % 6],
    )

    console.log(this.currentShowSongList)
  }


}
