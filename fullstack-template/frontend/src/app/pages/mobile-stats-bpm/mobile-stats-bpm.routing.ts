import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileStatsBpmComponent } from './mobile-stats-bpm.component';


const routes: Routes = [
  { path: '', component: MobileStatsBpmComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileStatsBpmRoutingModule { }
