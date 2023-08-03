import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginationComponent } from './pagination/pagination.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [PaginationComponent, UserCardComponent],
  imports: [CommonModule, CoreModule, MatIconModule, MatTabsModule],
  exports: [PaginationComponent, UserCardComponent],
})
export class SharedModule {}
