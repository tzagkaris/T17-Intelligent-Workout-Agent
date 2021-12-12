import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnWorkoutComponent } from './on-workout.component';


const routes: Routes = [
  { path: '', component: OnWorkoutComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OnWorkoutRoutingModule { }
