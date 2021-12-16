import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightwallRoutingModule } from './rightwall.routing';
import { RightwallComponent } from './rightwall.component';
import { VideosComponent } from './videos/videos.component';
import { MusicComponent } from './music/music.component';

@NgModule({
  imports: [
    CommonModule,
    RightwallRoutingModule
  ],
  declarations: [
    RightwallComponent,
    VideosComponent ,   //edw 8a mpainei ka8e allo component
    MusicComponent

  ]
})
export class RightwallModule { }
