import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebComponent } from './deb.component'
import { DebRoutingModule } from './deb.routing';

@NgModule({
  imports: [
    CommonModule,
    DebRoutingModule
  ],
  declarations: [DebComponent]
})
export class DebModule { }
