import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileIndexComponent } from './mobile-index.component';


const routes: Routes = [
  { path: '', component: MobileIndexComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileIndexRoutingModule { }
