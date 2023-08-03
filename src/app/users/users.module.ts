import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routes';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UserDetailsComponent, UsersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forChild(UsersRoutes),
    MatTabsModule,
    SharedModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
