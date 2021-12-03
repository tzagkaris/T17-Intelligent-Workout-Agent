import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebComponent } from './deb.component';


const routes: Routes = [
  { path: '', component: DebComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DebRoutingModule { }
