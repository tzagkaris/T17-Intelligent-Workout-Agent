import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterWallComponent } from './center-wall.component';


const routes: Routes = [
  { path: '', component: CenterWallComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CenterWallRoutingModule { }
