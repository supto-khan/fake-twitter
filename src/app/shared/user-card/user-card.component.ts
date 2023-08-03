import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/timeline/interface/user.interface';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() userSub = new BehaviorSubject<User | undefined>(undefined);
  @Input() followingSub: any;
  @Input() followersSub: any;
  @Input() tweetSub: any;
  @Input() userId: number = 0;
  private count: number = 1;

  constructor(public userService: UsersService) {}

  ngOnInit() {}

  onFollow(user: User) {
    this.userService.followUser(user);
  }

  onUnfollow(user: User) {
    this.userService.unfollowUser(user);
  }

  goToUser(user: User) {
    this.userService.getUser(user);
  }
}
