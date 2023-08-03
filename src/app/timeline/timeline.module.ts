import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { timelineRoutes } from './timeline.routes';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [TimelineComponent, PostTweetComponent, ProfileComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild(timelineRoutes),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    UsersModule,
  ],
})
export class TimelineModule {}
