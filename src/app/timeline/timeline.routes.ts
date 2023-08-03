import { Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from '../auth/auth.guard';

export const timelineRoutes: Routes = [
  {
    path: 'home',
    component: TimelineComponent,
    canActivate: [authGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
];
