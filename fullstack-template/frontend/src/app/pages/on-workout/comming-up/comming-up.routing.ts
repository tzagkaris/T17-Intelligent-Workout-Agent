import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommingUpComponent } from './comming-up.component';


const routes: Routes = [
  { path: '', component: CommingUpComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CommingUpRoutingModule { }
