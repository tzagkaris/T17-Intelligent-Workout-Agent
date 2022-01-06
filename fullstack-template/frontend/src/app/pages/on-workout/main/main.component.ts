import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { result } from 'lodash';
import { IExercise, IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('warmUpText', {static: true}) warmUpText: ElementRef;
  @ViewChild('exSetRepInfo', {static: true}) setRepInfo: ElementRef;
  @ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;
  @ViewChild('vidContainer', {static: true}) vidContainer: ElementRef;

  car: String = 'ble';
  public currStatus: IStatus = {
    condition : 'none',
    currRep : 0,
    currSet : 0,
    exerciseNo : 0,
    currExercise : {
      name : 'none',
      type : 'none',
    }
  };

  public currVideoPath: String = './../../assets/cactus.mp4';  /* temp video */

  VideoPaths: String[] = [
    /* temporary */
    './../../assets/cactus.mp4',
    './../../assets/cactus.mp4',
    './../../assets/cactus.mp4'
  ]

  public exInfo = "no info";

  constructor(private exService: ExerciseStateService, private socketService: SocketsService) {}

ngOnInit(): void {

  // mute and loop video by default
  this.videoPlayer.nativeElement.muted = 1;
  this.videoPlayer.nativeElement.loop = 1;

  this.exService.fetchExerciseState().subscribe((res: IStatus) => {
    this.currStatus = res;
    this.setSetRep(res);
    this.setExerciseInfo(res);
    this.currVideoPath = this.VideoPaths[res.exerciseNo]
    this.addWarmUp(res);
  })

  this.socketService.syncMessages("exercise-state").subscribe((msg) => {
    this.currStatus = msg.message;
    this.setSetRep(msg.message);
    this.setExerciseInfo(msg.message);
    this.currVideoPath = this.VideoPaths[msg.message.exerciseNo]
    this.addWarmUp(msg.message);
  })
}

  setExerciseInfo = (status: IStatus) => {

    this.exInfo = status.currExercise.name + " ::: ";

    if(status.currExercise.reps) {
      // exercise type is regular or weights

      let exReps = " ";
      exReps = exReps.concat(` ${status.currExercise.sets} x `)

      status.currExercise.reps.forEach(rep => {
        exReps = exReps.concat(`${rep} - `);
      })

      exReps = exReps.substring(0, exReps.length - 2);
      this.exInfo = this.exInfo.concat(exReps);
    } else {
      // exercise type is countdown or countup

      this.exInfo.concat(`${status.currExercise.countDownTimeInSecs} s`)
    }
  }

  setSetRep = (status: IStatus) => {

    switch(status.currExercise.type) {

      case 'Regular':
      case 'Weights':
        this.setRepInfo.nativeElement.innerText = `${status.currSet} - ${status.currRep}` ;
        break;

      case 'CountDown':
        this.simulateRepCountDown(this.setRepInfo.nativeElement.innerText, status)
        break;

    }

  }

  simulateRepCountDown = (output: String, status: IStatus) => {

    if(!status.currExercise.countDownTimeInSecs) return;
    this.setRepInfo.nativeElement.innerText = `${status.currSet} - ${ status.currExercise.countDownTimeInSecs}` ;
    setTimeout(() => {
      /* this runs every second. If counter reaches 0, this stops ticking */
      var repIntervalSecondCounter = status.currExercise.countDownTimeInSecs;
      var repInterval = setInterval(() => {
        repIntervalSecondCounter -= 1;
        if(repIntervalSecondCounter == 0) {
          clearInterval(repInterval);
        }

        this.setRepInfo.nativeElement.innerText = `${status.currSet} - ${repIntervalSecondCounter}` ;
      }, 1000)
    }, 45000)

  }

  addWarmUp = (status: IStatus) => {

    switch(status.currExercise.type) {
      case 'Regular':
        case 'Weights':
          if(status.currRep == 0 ) this.setWarmUp();
          break;

        case 'CountDown':
          this.setWarmUp();
          break;

    }
  }

  setWarmUp = () => {
    this.videoPlayer.nativeElement.style.filter = "grayscale(50%) blur(10px)";
    this.warmUpText.nativeElement.style.display = "inline";
    this.warmUpText.nativeElement.innerText = '45';

    var warmUpCounter = 45;
    var warmUpInterval = setInterval(() => {
      warmUpCounter -= 1;
      if(warmUpCounter == 0) {

        clearInterval(warmUpInterval);
        this.warmUpText.nativeElement.style.display = "none";
        this.videoPlayer.nativeElement.style.filter = "none";
        this.videoPlayer.nativeElement.play();
      }
      this.warmUpText.nativeElement.innerText = `${warmUpCounter}`;
    }, 1000)
  }

  startStopVideo = () => {
    let video = this.videoPlayer.nativeElement;
    if(video.paused || video.ended) video.play();
    else video.pause();
  }
}
