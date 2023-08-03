import { Component, OnInit } from '@angular/core';
import { User } from '../../timeline/interface/user.interface';
import { UsersService } from '../users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private count: number = 1;

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor(public userService: UsersService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getCalculatedUsersList();
  }

  onFollow(user: User) {
    this.userService.followUser(user);
  }

  onUnfollow(user: User) {
    this.userService.unfollowUser(user);
  }

  goToUser(user: User) {
    this.userService.getUser(user);
  }

  paginationInfo() {
    this.userService.getCalculatedUsersList(10, this.count++);
  }

  search(event: any) {
    this.userService.searchUser(this.searchForm.getRawValue());
  }
}
