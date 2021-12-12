import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterWallComponent } from './center-wall.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { CalClosedComponent } from './cal-closed/cal-closed.component';
import { CenterWallRoutingModule } from './center-wall.routing';

@NgModule({
  imports: [
    CommonModule,
    CenterWallRoutingModule
  ],
  declarations: [
    CenterWallComponent,
    StartComponent,
    CalClosedComponent,
    UserComponent
  ]
})
export class CenterWallModule { }
