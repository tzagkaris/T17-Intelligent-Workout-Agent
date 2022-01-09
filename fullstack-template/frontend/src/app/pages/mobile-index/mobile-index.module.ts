import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MobileIndexRoutingModule } from './mobile-index.routing';
import {  MobileIndexComponent } from './mobile-index.component';
import { LoginComponent } from './login/login.component';
import { SchedComponent } from './sched/sched.component';
import { QuickComponent } from './quick/quick.component';
import { CustomComponent } from './custom/custom.component';
import { FooterIndexComponent } from './footer-index/footer-index.component';

@NgModule({
  imports: [
    CommonModule,
    MobileIndexRoutingModule
  ],
  declarations: [
    MobileIndexComponent,
    LoginComponent,
    SchedComponent,
    QuickComponent,
    CustomComponent,
    FooterIndexComponent
    // edw mpainei ka8e alklo component
  ]
})
export class MobileIndexModule { }
