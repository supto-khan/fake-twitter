import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { authGuard } from '../auth/auth.guard';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [authGuard],
  },
];
