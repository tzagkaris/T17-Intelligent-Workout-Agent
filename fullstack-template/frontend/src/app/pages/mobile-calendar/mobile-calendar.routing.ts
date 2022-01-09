import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileCalendarComponent } from './mobile-calendar.component';


const routes: Routes = [
  { path: '', component: MobileCalendarComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileCalendarRoutingModule { }
