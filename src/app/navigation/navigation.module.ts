import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [SidenavComponent],
})
export class NavigationModule {}
