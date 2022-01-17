import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'on-workout', loadChildren: () => import('./pages/on-workout/on-workout.module').then(m => m.OnWorkoutModule) },
  { path: 'leftwall', loadChildren: () => import('./pages/leftwall/leftwall.module').then(m => m.LeftwallModule) },
  { path: 'mobile-index', loadChildren: () => import('./pages/mobile-index/mobile-index.module').then(m => m.MobileIndexModule) },
  { path: 'mobile-onworkout', loadChildren: () => import('./pages/mobile-onworkout/mobile-onworkout.module').then(m => m.MobileOnworkoutModule) },
  { path: 'mobile-calendar', loadChildren: () => import('./pages/mobile-calendar/mobile-calendar.module').then(m => m.MobileCalendarModule) },
  { path: 'mobile-music', loadChildren: () => import('./pages/mobile-music/mobile-music.module').then(m => m.MobileMusicModule) },
  { path: 'mobile-stats', loadChildren: () => import('./pages/mobile-stats/mobile-stats.module').then(m => m.MobileStatsModule) },
  { path: 'mobile-stats-cal', loadChildren: () => import('./pages/mobile-stats-cal/mobile-stats-cal.module').then(m => m.MobileStatsCalModule) },
  { path: 'mobile-stats-bpm', loadChildren: () => import('./pages/mobile-stats-bpm/mobile-stats-bpm.module').then(m => m.MobileStatsBpmModule) },
  { path: 'rightwall', loadChildren: () => import('./pages/rightwall/rightwall.module').then(m => m.RightwallModule) },
  { path: 'center-wall', loadChildren: () => import('./pages/center-wall/center-wall.module').then(m => m.CenterWallModule) },
  { path: 'deb', loadChildren: () => import('./pages/deb/deb.module').then(m => m.DebModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: '**', redirectTo: 'center-wall', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
