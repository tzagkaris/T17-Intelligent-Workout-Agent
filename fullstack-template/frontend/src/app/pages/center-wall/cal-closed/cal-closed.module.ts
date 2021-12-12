import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalClosedComponent } from './cal-closed.component';
import { CalClosedRoutingModule } from './cal-closed.routing';

@NgModule({
  imports: [
    CommonModule,
    CalClosedRoutingModule
  ],
  declarations: [CalClosedComponent]
})
export class CalClosedModule { }
