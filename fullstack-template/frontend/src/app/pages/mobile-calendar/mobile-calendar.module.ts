import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileCalendarRoutingModule } from './mobile-calendar.routing';
import { MobileCalendarComponent } from './mobile-calendar.component';
import { LoginComponent } from './login/login.component';
import { TodayComponent } from './today/today.component';
import { OtherDayComponent } from './other-day/other-day.component';
import { OtherDay1Component } from './other-day1/other-day1.component';
import { OtherDay2Component } from './other-day2/other-day2.component';
import { OtherDay3Component } from './other-day3/other-day3.component';
import { OtherDay4Component } from './other-day4/other-day4.component';
import { OtherDay5Component } from './other-day5/other-day5.component';
import { FooterCalendarComponent } from './footer-calendar/footer-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    MobileCalendarRoutingModule
  ],
  declarations: [
    MobileCalendarComponent,
    LoginComponent,
    TodayComponent,
    OtherDayComponent,
    OtherDay1Component,
    OtherDay2Component,
    OtherDay3Component,
    OtherDay4Component,
    OtherDay5Component,
    FooterCalendarComponent
     // edw mpainei ka8e alklo component

  ]
})
export class MobileCalendarModule { }
