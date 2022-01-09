import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, AfterViewInit {

  @ViewChild('globalTime', { static: true }) globalTime: ElementRef;
  @ViewChild('workoutTime', { static: true }) workoutTime: ElementRef;
  @ViewChild('heartRate', { static: true }) heartRate: ElementRef;
  @ViewChild('heartPresentage', { static: true }) heartPresentage: ElementRef;
  @ViewChild('heartPresentageIcon', { static: true }) heartPresentageIcon: ElementRef;
  @ViewChild('workoutPauseImg', { static: false  }) workoutPauseImg: ElementRef;
  @ViewChild('workoutPlayImg', { static: false }) workoutPlayImg: ElementRef;

  workoutHours: number;
  workoutMins: number;
  workoutSecs: number;
  HeartRating: number;

  notPaused: boolean = true;

  constructor(private sock: SocketsService) {}

  ngOnInit(): void {
    this.workoutHours= 0;
    this.workoutMins = 0;
    this.workoutSecs = 0;
    this.HeartRating = 70;
  }

  ngAfterViewInit(): void {
    let workoutPlay: HTMLImageElement = this.workoutPlayImg.nativeElement;
    workoutPlay.classList.add("dis-none");

    /* get the real time every minute and display it on the clock */
    this.clockCounter();
    setInterval(this.clockCounter, 60000);

    /* start a countup timer for workout time */
    setInterval(this.workoutTimerInc, 1000);

    /* generate a random heartRate every 4 secs */
    setInterval(this.heartRateTracking, 4000);

    this.sock.syncMessages('exercise/pause').subscribe((msg) => {
      this.notPaused = !this.notPaused;
      this.changePausePlayImage();
    })
  }

  /**
   * Runs every minute, updates global time
   */
  clockCounter = () => {
    let date = new Date();
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    let time = `${hours}:${mins}`
    this.globalTime.nativeElement.innerHTML = time;
  }

  /**
   * Runs every second, updates workout time
   */
  workoutTimerInc = () => {
    if(this.notPaused) {

      ++this.workoutSecs;
      if(this.workoutSecs > 59) {
        this.workoutSecs = 0;
        ++this.workoutMins;
        if(this.workoutMins > 59) {
          this.workoutMins = 0;
          ++this.workoutHours;
        }
      }

      let showSecs = this.workoutSecs < 10 ? `0${this.workoutSecs}` : this.workoutSecs;
      let showMins = this.workoutMins < 10 ? `0${this.workoutMins}` : this.workoutMins;
      let showHours = this.workoutHours < 10 ? `0${this.workoutHours}` : this.workoutHours;

      this.workoutTime.nativeElement.innerHTML =
      `${showHours}:${showMins}:${showSecs}`;
    }
  }

  heartRateTracking = () => {
    if(this.notPaused) {

      let lastReading = this.HeartRating;
      this.HeartRating = this.generateBetween(this.HeartRating - 3, this.HeartRating + 3);

      if(this.HeartRating < 60)
        this.HeartRating = this.HeartRating + 10;
      else if(this.HeartRating > 160)
        this.HeartRating = this.HeartRating - 10;

      this.heartRate.nativeElement.innerHTML = this.HeartRating;

      let pres: String = this.getIncPresentage(lastReading, this.HeartRating).toString();

      if(pres[0] == '-') {
        this.heartPresentageIcon.nativeElement
        .setAttribute('src', './../../assets/down-trending-icon.svg');
      } else {
        this.heartPresentageIcon.nativeElement
        .setAttribute('src', './../../assets/up-trending-icon.svg');
      }

      this.heartPresentage.nativeElement.innerHTML = `${pres.substring(0, 4)}%`;
    }
  }

  generateBetween = (min: number, max: number) :number => {
    return Math.floor( Math.random() * (max - min) + min )
  }

  getIncPresentage = (last:number, current:number):number => {
    return (((current - last)/ current) * 100)
  }

  pauseStartTimer() {
    this.notPaused = !this.notPaused;
    this.changePausePlayImage();
  }

  changePausePlayImage() {
    let play: HTMLImageElement = this.workoutPlayImg.nativeElement;
    let pause: HTMLImageElement = this.workoutPauseImg.nativeElement;

    if(this.notPaused) {
      play.classList.add("dis-none");
      pause.classList.remove("dis-none");
    } else {
      pause.classList.add("dis-none");
      play.classList.remove("dis-none");
    }
  }
}


/*
TODO:
1.make a heartRateIntense function to be called by other sources to make heartRateTracking
more agressive.
*/
