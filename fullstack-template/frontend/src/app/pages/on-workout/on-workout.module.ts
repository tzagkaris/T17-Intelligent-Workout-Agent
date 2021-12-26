import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnWorkoutComponent } from './on-workout.component';
import { TimerComponent } from './timer/timer.component';
import { CommingUpComponent } from './comming-up/comming-up.component';
import { MainComponent } from './main/main.component';
import { OnWorkoutRoutingModule } from './on-workout.routing';
import { MainVideoComponent } from './secondary-video/secondary-video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  imports: [
    CommonModule,
    OnWorkoutRoutingModule
  ],
  declarations: [
    OnWorkoutComponent,
    TimerComponent,
    CommingUpComponent,
    MainComponent,
    MainVideoComponent,
    VideoPlayerComponent
  ]
})
export class OnWorkoutModule { }
