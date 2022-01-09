import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileStatsComponent } from './mobile-stats.component';


const routes: Routes = [
  { path: '', component: MobileStatsComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileStatsRoutingModule { }
