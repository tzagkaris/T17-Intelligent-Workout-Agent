import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterWallComponent } from './center-wall.component'
import { CalClosedComponent } from './cal-closed/cal-closed.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { CenterWallRoutingModule } from './center-wall.routing';

@NgModule({
  imports: [
    CommonModule,
    CenterWallRoutingModule
  ],
  declarations: [CenterWallComponent, CalClosedComponent, StartComponent, UserComponent]
})
export class CenterWallModule { }
