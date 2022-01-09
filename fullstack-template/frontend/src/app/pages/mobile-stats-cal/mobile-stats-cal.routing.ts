import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileStatsCalComponent } from './mobile-stats-cal.component';


const routes: Routes = [
  { path: '', component: MobileStatsCalComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileStatsCalRoutingModule { }
