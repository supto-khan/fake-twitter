import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../timeline/interface/user.interface';
import { environment } from 'src/environments/environments';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { Timeline } from '../timeline/interface/timeline.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersSub = new BehaviorSubject<User[]>([]);
  public user = new BehaviorSubject<User | undefined>(undefined);
  public userId: number = 0;
  public followingUserSub = new BehaviorSubject<User[]>([]);
  public followersUserSub = new BehaviorSubject<User[]>([]);
  public tweetsSub = new BehaviorSubject<Timeline[]>([]);
  public isLoading: boolean = false;

  private baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  getUsers(link: string) {
    return this.httpClient
      .get<{ count: number; users: User[] }>(
        this.baseUrl + 'users' + '?' + link
      )
      .pipe(
        map((users: any) => {
          users.users.forEach((user: User) => {
            user.isFollowing = false;
          });
          return users;
        })
      );
  }

  getCalculatedUsersList(size: number = 10, page: number = 1) {
    this.isLoading = true;
    let link: string = '';
    if (size) link += 'size=' + size;
    if (page) link += '&page=' + page;
    combineLatest([this.getUsers(link), this.followingUerList(link)])
      .pipe(
        map(([users, followingUsers]: any) => {
          users.users.map((user: User) => {
            followingUsers.followings.map((followingUser: User) => {
              if (user.id === followingUser.id) {
                user.isFollowing = true;
              }
            });
          });
          return users;
        })
      )
      .subscribe((res: { count: number; users: User[] }) => {
        if (res) {
          this.isLoading = false;

          this.usersSub.next(res.users);

          if (this.userId) {
            this.user.next(
              res.users.find((user) => user.id === Number(this.userId))
            );
          }
        }
      });
  }

  getUser(user: User) {
    this.user.next(user);
  }

  getTweetByUserId(id: number) {
    this.isLoading = true;
    this.httpClient
      .get<{ count: number; tweets: Timeline[] }>(
        this.baseUrl + 'users/' + id + '/tweets'
      )
      .subscribe((res: { count: number; tweets: Timeline[] }) => {
        if (res) {
          this.isLoading = false;
          this.tweetsSub.next(res.tweets);
        }
      });
  }

  getFollowingByUserId(id: number) {
    this.isLoading = true;
    this.httpClient
      .get<{ count: number; followings: User[] }>(
        this.baseUrl + 'users/' + id + '/following'
      )
      .subscribe((res: { count: number; followings: User[] }) => {
        if (res) {
          this.isLoading = false;
          this.followingUserSub.next(res.followings);
        }
      });
  }

  getFollowersByUserId(id: number) {
    this.isLoading = true;
    this.httpClient
      .get<{ count: number; followers: User[] }>(
        this.baseUrl + 'users/' + id + '/followers'
      )
      .subscribe((res: { count: number; followers: User[] }) => {
        if (res) {
          this.isLoading = false;
          this.followersUserSub.next(res.followers);
        }
      });
  }

  followingUerList(link: string) {
    return this.httpClient.get(this.baseUrl + '/following' + '?' + link);
  }

  followUser(user: User) {
    this.httpClient
      .post(this.baseUrl + 'follow', {
        user_id: user.id,
      })
      .subscribe((res: any) => {
        if (res) {
          user.isFollowing = !user.isFollowing;
          this.notificationService.success(res.resp);
        }
      });
  }

  unfollowUser(user: User) {
    this.httpClient
      .post(this.baseUrl + 'unfollow', {
        user_id: user.id,
      })
      .subscribe((res: any) => {
        if (res) {
          user.isFollowing = !user.isFollowing;
          this.notificationService.success(res.resp);
        }
      });
  }

  searchUser(query: string) {
    this.httpClient
      .post(this.baseUrl + 'search', {
        search: query.search,
      })
      .subscribe((res: any) => {
        if (res) {
          this.usersSub.next(res.search_results);
        }
      });
  }
}
