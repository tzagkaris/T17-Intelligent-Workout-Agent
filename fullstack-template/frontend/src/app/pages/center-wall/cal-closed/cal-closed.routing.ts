import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalClosedComponent } from './cal-closed.component';


const routes: Routes = [
  { path: '', component: CalClosedComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CalClosedRoutingModule { }
