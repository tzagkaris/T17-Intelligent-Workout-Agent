import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileStatsBpmRoutingModule } from './mobile-stats-bpm.routing';
import { MobileStatsBpmComponent } from './mobile-stats-bpm.component';
import { LoginComponent } from './login/login.component';
import { FooterStatsComponent } from './footer-stats/footer-stats.component';
import { CalClosedComponent } from './cal-closed/cal-closed.component';
import { BpmOpenComponent } from './bpm-open/bpm-open.component';
import { PerformanceComponent } from './performance/performance.component';
import { RouterModule } from '@angular/router';






@NgModule({
  imports: [
    CommonModule,
    MobileStatsBpmRoutingModule,
    RouterModule
  ],
  declarations: [
    MobileStatsBpmComponent,
    LoginComponent,
    FooterStatsComponent,
    CalClosedComponent,
    BpmOpenComponent,
    PerformanceComponent

   // edw mpainei ka8e alklo component

  ]
})
export class MobileStatsBpmModule { }
