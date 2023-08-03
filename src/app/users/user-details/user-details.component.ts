import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/timeline/interface/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private userId: number = 0;
  private count: number = 1;

  constructor(
    public userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.params.subscribe((params) => {
        if (params['id']) {
          this.userService.userId = params['id'];
          this.userId = Number(params['id']);
          this.userService.getFollowersByUserId(Number(params['id']));
          this.userService.getFollowingByUserId(Number(params['id']));
          this.userService.getTweetByUserId(Number(params['id']));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
