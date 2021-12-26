import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'on-workout',
  templateUrl: './on-workout.component.html',
  styleUrls: ['./on-workout.component.css']
})

export class OnWorkoutComponent {

  @ViewChild('mainVideo', {static: false}) mainVideo: ElementRef;

  ClosedState: boolean = true;

  removeMediaVideo = () => {
    this.ClosedState = false;
  }
}

/*
 *  TO DO:
      ADD A LIST OF VIDEOS IN ASSETS
      MAKE SOCKET EVENT TO PROPAGATE THE VIDEO SOURCE AND NAME HERE,
      IF it is open, add new source and name to the opened main-video component.
      IF main-video is not toggled, toggle ClosedState and precify the source and name of the video.
 */
