import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RightwallComponent } from './rightwall.component';


const routes: Routes = [
  { path: '', component: RightwallComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RightwallRoutingModule { }
