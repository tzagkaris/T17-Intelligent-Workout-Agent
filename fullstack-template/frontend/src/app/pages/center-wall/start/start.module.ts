import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start.routing';

@NgModule({
  imports: [
    CommonModule,
    StartRoutingModule
  ],
  declarations: [StartComponent]
})
export class StartModule { }
