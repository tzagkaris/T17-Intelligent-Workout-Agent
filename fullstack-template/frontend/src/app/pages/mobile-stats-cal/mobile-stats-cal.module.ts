import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileStatsCalRoutingModule } from './mobile-stats-cal.routing';
import { MobileStatsCalComponent } from './mobile-stats-cal.component';
import { LoginComponent } from './login/login.component';
import { FooterStatsComponent } from './footer-stats/footer-stats.component';
import { BpmClosedComponent } from './bpm-closed/bpm-closed.component';
import { PerformanceComponent } from './performance/performance.component';
import { CalOpenComponent } from './cal-open/cal-open.component';
import { RouterModule } from '@angular/router';





@NgModule({
  imports: [
    CommonModule,
    MobileStatsCalRoutingModule,
    RouterModule
  ],
  declarations: [
    MobileStatsCalComponent,
    LoginComponent,
    FooterStatsComponent,
    BpmClosedComponent,
    PerformanceComponent,
    CalOpenComponent

   // edw mpainei ka8e alklo component

  ]
})
export class MobileStatsCalModule { }
