import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommingUpComponent } from './comming-up.component';
import { CommingUpRoutingModule } from './comming-up.routing';

@NgModule({
  imports: [
    CommonModule,
    CommingUpRoutingModule
  ],
  declarations: [
    CommingUpComponent
  ]
})
export class CommingUpModule { }
