import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileStatsRoutingModule } from './mobile-stats.routing';
import { MobileStatsComponent } from './mobile-stats.component';
import { LoginComponent } from './login/login.component';
import { CaloClosedComponent } from './cal-closed/cal-closed.component';
import { BpmClosedComponent } from './bpm-closed/bpm-closed.component';
import { PerformanceComponent } from './performance/performance.component';
import { FooterStatsComponent } from './footer-stats/footer-stats.component';
import { RouterModule } from '@angular/router';





@NgModule({
  imports: [
    CommonModule,
    MobileStatsRoutingModule,
    RouterModule
  ],
  declarations: [
    MobileStatsComponent,
    LoginComponent,
    CaloClosedComponent,
    BpmClosedComponent,
    PerformanceComponent,
    FooterStatsComponent
   // edw mpainei ka8e alklo component

  ]
})
export class MobileStatsModule { }
