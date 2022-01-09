import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileOnworkoutRoutingModule } from './mobile-onworkout.routing';
import { MobileOnworkoutComponent } from './mobile-onworkout.component';
import { LoginComponent } from './login/login.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { FooterIndexComponent } from './footer-index/footer-index.component';




@NgModule({
  imports: [
    CommonModule,
    MobileOnworkoutRoutingModule
  ],
  declarations: [
    MobileOnworkoutComponent,
    LoginComponent,
    MainPanelComponent,
    FooterIndexComponent
   // edw mpainei ka8e alklo component

  ]
})
export class MobileOnworkoutModule { }
