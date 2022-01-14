import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMirrorBundle, MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements AfterViewInit {

  constructor(private ex: ExerciseStateService, private sock: SocketsService, public mediaService: MediaService) {}

  workoutState: IStatus = {
    currExercise: { name: 'Warm Up' , type: 'CountDown', sets: 1, countDownTimeInSecs: 180, vpath: './../../../../assets/workout_vids/warm_up_edited.mp4', imageRef: './../../../../assets/thumbnails/warm_up_down.svg' },
    exerciseNo: 0,
    currSet: 1,
    currRep: 0,
    condition: "not started",
  };

  setRep = "3 x 12"

  @ViewChild('repTimeTextRef', {static: false}) repTimeTextRef: ElementRef;
  @ViewChild('repTimeRef', {static: false}) repTimeRef: ElementRef;
  repTimeText: HTMLSpanElement;
  repTime: HTMLSpanElement;

    /* STREAMING RELATED STUFF */
    MIRROR_FRAMES_PER_SEC = 3;

    isStreaming: boolean = false;
    outputWidth: number = 500;
    outputHeight: number = 500;
    intervalRef: any = 0;

    @ViewChild('vCanvas', {static: false}) canvasElem: ElementRef;
    @ViewChild('vShow', {static: false}) videoElem: ElementRef;
    @ViewChild('mirrorButton', {static: false}) mirrorButtonRef: ElementRef;

    canvas: HTMLCanvasElement;
    video: HTMLVideoElement;
    mirrorButton: HTMLHeadElement;

  ngAfterViewInit(): void {

    this.video = this.videoElem.nativeElement;
    this.canvas = this.canvasElem.nativeElement;
    this.mirrorButton = this.mirrorButtonRef.nativeElement;

    this.repTime = this.repTimeRef.nativeElement;
    this.repTimeText = this.repTimeTextRef.nativeElement;

    this.ex.fetchExerciseState().subscribe((r:IStatus) => {
      this.workoutState = r;
      this.setExerciseInfo(r)
      this.setRepDynamic(r)
    })

    this.sock.syncMessages('exercise-state').subscribe(r => {
      this.workoutState = r.message;
      this.setExerciseInfo(r.message)
      this.setRepDynamic(r.message)
    })

    /* STREAMING VIDEO FEED */
    this.video.addEventListener('canplay', () => {
      if(!this.isStreaming) {

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

      this.video.setAttribute('width', `${this.outputWidth}`)
      this.video.setAttribute('height', `${this.outputHeight}`)
      this.canvas.setAttribute('width',`${this.outputWidth}`)
      this.canvas.setAttribute('height',`${this.outputHeight}`)
    }
    this.isStreaming = true;
  }

  shareState: boolean = false;
  toggleShare = () => {

    this.shareState = !this.shareState;
    if(this.shareState) {
      this.startShare()
      this.mirrorButton.innerText = "Disable Mirror"
    }
    else {
      this.stopShare()
      this.mirrorButton.innerText = "Enable Mirror"
    }
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

  setExerciseInfo = (status: IStatus) => {

    let exSets = " ";
    exSets = exSets.concat(` ${status.currExercise.sets} x `)

    this.setRep = exSets;

    if(status.currExercise.reps) {
      // exercise type is regular or weights

      let exReps = "";
      status.currExercise.reps.forEach(rep => {
        exReps = exReps.concat(`${rep} - `);
      })

      exReps = exReps.substring(0, exReps.length - 2);
      this.setRep = this.setRep.concat(exReps);
    } else {
      // exercise type is countdown or countup

      this.setRep = this.setRep.concat(`${status.currExercise.countDownTimeInSecs} s`)
    }
  }

  setRepDynamic = (status: IStatus) => {

    if(status.currExercise.reps) {
      this.repTime.innerText = `${status.currRep + 1}`;
      this.repTimeText.innerText = 'Rep';
      this.repTime.classList.remove('title-1')
    }

    else {
      this.repTime.innerText = `${status.currExercise.countDownTimeInSecs} s`;
      this.repTime.classList.add('title-1')

      this.repTimeText.innerText = 'Time';

    }
  }
}
