import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import { TimerRoutingModule } from './timer.routing';

@NgModule({
  imports: [
    CommonModule,
    TimerRoutingModule
  ],
  declarations: [
    TimerComponent
  ]
})
export class TimerModule { }
