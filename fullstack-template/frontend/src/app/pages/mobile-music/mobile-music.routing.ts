import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileMusicComponent } from './mobile-music.component';


const routes: Routes = [
  { path: '', component: MobileMusicComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileMusicRoutingModule { }
