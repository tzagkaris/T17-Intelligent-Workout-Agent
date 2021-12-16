import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftwallRoutingModule } from './leftwall.routing';
import { LeftwallComponent } from './leftwall.component';
import { MainBoxComponent } from './main-box/main-box.component';
import { PerformanceComponent } from './performance/performance.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    LeftwallRoutingModule
  ],
  declarations: [
    LeftwallComponent,
    MainBoxComponent,  // edw mpainei ka8e alklo component
    PerformanceComponent,
    FunfactsComponent,
    StatisticsComponent
  ]
})
export class LeftwallModule { }
