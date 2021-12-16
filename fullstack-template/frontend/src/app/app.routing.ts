import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'on-workout', loadChildren: () => import('./pages/on-workout/on-workout.module').then(m => m.OnWorkoutModule) },
  { path: 'leftwall', loadChildren: () => import('./pages/leftwall/leftwall.module').then(m => m.LeftwallModule) },
  { path: 'rightwall', loadChildren: () => import('./pages/rightwall/rightwall.module').then(m => m.RightwallModule) },
  { path: 'center-wall', loadChildren: () => import('./pages/center-wall/center-wall.module').then(m => m.CenterWallModule) },
  { path: 'deb', loadChildren: () => import('./pages/deb/deb.module').then(m => m.DebModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: '**', redirectTo: 'deb', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
