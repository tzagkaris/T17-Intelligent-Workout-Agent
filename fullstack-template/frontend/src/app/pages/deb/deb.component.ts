import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toInteger } from 'lodash';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { ISecondaryMediaState } from 'src/app/global/models/media/media.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMirrorBundle, IMusicState, ISong, MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'ami-fullstack-deb',
  templateUrl: './deb.component.html',
  styleUrls: ['./deb.component.css']
})
export class DebComponent implements OnInit, AfterViewInit {

  @ViewChild('secondaryVideoSelection', {static: false}) videoSelection: ElementRef;

  public currentExerciseState: IStatus;


  /* STREAMING RELATED STUFF */
  MIRROR_FRAMES_PER_SEC = 3;

  isStreaming: boolean = false;
  outputWidth: number = 500;
  outputHeight: number = 0; /* this will be set depending on the aspect ratio of the camera */
  intervalRef: any = 0;

  @ViewChild('vCanvas', {static: false}) canvasElem: ElementRef;
  @ViewChild('vShow', {static: false}) videoElem: ElementRef;
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;

  @ViewChild('musicSelection', {static: true}) musicSelectionRef: ElementRef;
  @ViewChild('volumeSelection', {static: true}) volumeSelectionRef: ElementRef;
  musicSelection: HTMLSelectElement;
  volumeSelection: HTMLSelectElement;

  @ViewChild('timeSelector', {static: true}) timeSelectorRef: ElementRef;
  @ViewChild('repSelector', {static: true}) repSelectorRef: ElementRef;
  repSelector: HTMLSelectElement;
  timeSelector: HTMLSelectElement;


  tempSong: ISong = {
    name: 'no info',
    artist: 'no info',
    duration: 'none',
    filepath: ''
  }

  musicState: IMusicState = {
    index: -1,
    status: 'paused',
    volume: .2,
    song: {
      name: 'no info',
      artist: 'no info',
      duration: 'none',
      filepath: ''
    }
  };

  constructor(private exStateService: ExerciseStateService,
              private mediaService: MediaService,
              private socketService: SocketsService) {

    this.currentExerciseState = {
      currExercise: { name: "No Data", type: "none"},
      exerciseNo: 0,
      currSet: 1,
      currRep: 0,
      condition: "ongoing",
    };
  }

  mediaVideosArray = {
    cactus: {name: 'Cactus Meme Video', path: './../../../../assets/cactus.mp4'},
    another: {name: 'Another Video', path: './../../../../assets/video0_1.mp4'}
  }

  secondaryMediaState: ISecondaryMediaState = {
    name: 'initial',
    path: 'initial'
  }


  ngOnInit() {

    this.socketService.syncMessages("exercise-state").subscribe((msg) => {
      this.currentExerciseState = msg.message;
    })

    this.socketService.syncMessages('secondary-video').subscribe((msg) => {
      this.secondaryMediaState = msg.message;
    })

    this.socketService.syncMessages('music/state').subscribe((msg) => {
      if(msg.message.song == undefined)
        msg.message.song = this.tempSong;

        this.musicState = msg.message;
    })

  }

  ngAfterViewInit(): void {

    /* getting html handles */
    this.video = this.videoElem.nativeElement;
    this.canvas = this.canvasElem.nativeElement;

    this.musicSelection = this.musicSelectionRef.nativeElement;
    this.volumeSelection = this.volumeSelectionRef.nativeElement;

    this.repSelector = this.repSelectorRef.nativeElement;
    this.timeSelector = this.timeSelectorRef.nativeElement;

    /* STREAMING VIDEO FEED */
    this.video.addEventListener('canplay', () => {
      if(!this.isStreaming) {
        this.outputHeight = this.video.videoHeight / (this.video.videoWidth/this.outputWidth);

        if (isNaN(this.outputHeight)) {
          this.outputHeight = this.outputWidth / (4/3);
        }

        this.video.setAttribute('width', `${this.outputWidth}`)
        this.video.setAttribute('height', `${this.outputHeight}`)
        this.canvas.setAttribute('width',`${this.outputWidth}`)
        this.canvas.setAttribute('height',`${this.outputHeight}`)
      }
      this.isStreaming = true;
    })

  }

  public prepareStream = () => {

    this.video = this.videoElem.nativeElement;
    this.canvas = this.canvasElem.nativeElement;

    if(!this.isStreaming) {
      this.outputHeight = this.video.videoHeight / (this.video.videoWidth/this.outputWidth);

      if (isNaN(this.outputHeight)) {
        this.outputHeight = this.outputWidth / (4/3);
      }

      this.video.setAttribute('width', `${this.outputWidth}`)
      this.video.setAttribute('height', `${this.outputHeight}`)
      this.canvas.setAttribute('width',`${this.outputWidth}`)
      this.canvas.setAttribute('height',`${this.outputHeight}`)
    }
    this.isStreaming = true;
  }

  public fetchSecondaryState =() => {
    this.mediaService.getSecondaryMedia().subscribe();  /* Return value is propagated from socket  */
  }

  public setSelected =() => {
    let videoSelection = this.videoSelection.nativeElement;
    let vid = this.mediaVideosArray[videoSelection.value];
    this.mediaService.setSecondaryMedia(vid.name, vid.path).subscribe();
  }

  public fetchExState =() => {
    this.exStateService.fetchExerciseState().subscribe();
  }

  public upExState =() => {
    this.exStateService.upExerciseState().subscribe();
  }

  public resetExState =() => {
    this.exStateService.resetExerciseState().subscribe();
  }


  /* STREAM VIDEO FEED */
  public startShare = () => {

    if(!this.isStreaming) this.prepareStream();

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
      this.video.srcObject = stream;
      this.video.play();
    })

    /* stop prev share if open */
    this.stopShare();

    let bundle: IMirrorBundle = {
      width: this.outputWidth,
      height: this.outputHeight,
      image: this.captureImg()
    }
    this.mediaService.initMirror(bundle).subscribe();

    /* start sharing constant updates after a while */
    setTimeout(() => {
      this.intervalRef = setInterval(() => {
        let img = this.captureImg();
        this.mediaService.newMirrorData(img).subscribe();

      }, 1000/this.MIRROR_FRAMES_PER_SEC /* frames per sec 1000/x */)
    }, 1000)

  }

  public stopShare = () => {
    /* clean interval if already opened */
    clearInterval(this.intervalRef);

    /* send a close command */
    this.mediaService.closeMirror().subscribe();
  }

  public captureImg = (): string => {
    let context = this.canvas.getContext('2d');

    if(this.outputHeight && this.outputWidth) {

      this.canvas.width = this.outputWidth;
      this.canvas.height = this.outputHeight;
      context.drawImage(this.video, 0, 0, this.outputWidth, this.outputHeight)

      return this.canvas.toDataURL('image/png');
    }

    return null;
  }

  /* MUSIC PLAYER */
  public getMusicState = () => {
    this.mediaService.getMusicState()
    .subscribe(res => {
      if(res.song == undefined)
        res.song = this.tempSong;
      this.musicState = res;
    })
  }

  public setMusicPlaying = () => {
    this.mediaService.setMusicPlaying().subscribe();
  }

  public setMusicPaused = () => {
    this.mediaService.setMusicPaused().subscribe();
  }

  public setTrack = () => {
    if( this.musicSelection.value == 'next')
      this.setNextTrack();
    else
      this.setTrackByName(this.musicSelection.value);
  }

  public setNextTrack = () => {
    this.mediaService.nextTrack().subscribe();
  }

  public setTrackByName = (name: string) => {
    this.mediaService.setTrackByName(name).subscribe();
  }

  public changeVolume = () => {
    let vol = parseFloat(this.volumeSelection.value);
    this.mediaService.setVolume(vol).subscribe();
  }

  public resetMusicState = () => {
    this.mediaService.resetMusicState().subscribe();
  }

  public startWorkout = () => {
    this.exStateService.startWorkout().subscribe();
  }

  public endWorkout = () => {
    this.exStateService.endWorkout().subscribe();
  }

  public pauseWorkout = () => {
    this.exStateService.pauseWorkout().subscribe();
  }

  public setNewReps = () => {
    let reps = parseInt(this.repSelector.value);
    this.exStateService.newReps(reps).subscribe();
  }

  public setNewTime = () => {
    let time = parseInt(this.timeSelector.value);
    this.exStateService.newTime(time).subscribe();
  }
}
