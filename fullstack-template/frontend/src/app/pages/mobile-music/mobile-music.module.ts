import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MobileMusicRoutingModule } from './mobile-music.routing';
import {  MobileMusicComponent } from './mobile-music.component';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import { ManageButtonComponent } from './manage-button/manage-button.component';
import { FooterMusicComponent } from './footer-music/footer-music.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MobileMusicRoutingModule,
    RouterModule
  ],
  declarations: [
    MobileMusicComponent,
    LoginComponent,
    PlayerComponent,
    ManageButtonComponent,
    FooterMusicComponent
    // edw mpainei ka8e alklo component
  ]
})
export class MobileMusicModule { }
