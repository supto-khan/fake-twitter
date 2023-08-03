import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Timelines } from '../interface/timelines.interface';
import { BehaviorSubject } from 'rxjs';
import { Timeline } from '../interface/timeline.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  public timelineSub = new BehaviorSubject<Timeline[]>([]);

  public tweetsSub = new BehaviorSubject<Timeline[]>([]);
  public followingSub = new BehaviorSubject<User[]>([]);
  public followersSub = new BehaviorSubject<User[]>([]);

  public isLoading: boolean = false;

  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  getTimeLine(size: number = 10, page: number = 1) {
    this.isLoading = true;
    let link: string = '';
    if (size) link += 'size=' + size;
    if (page) link += '&page=' + page;
    this.httpClient
      .get<Timelines>(this.baseUrl + 'timeline' + '?' + link)
      .subscribe((res: Timelines) => {
        if (res) {
          this.timelineSub.next(res.timeline);
          this.isLoading = false;
        }
      });
  }

  postTweet(payload: { content: string }) {
    this.httpClient
      .post(this.baseUrl + 'tweet', payload)
      .subscribe((res: any) => {
        if (res) {
          this.notificationService.success(res.message);
          this.addNewDataInTimelineSub([res.tweet]);
        }
      });
  }

  getTweets() {
    this.httpClient
      .get<{ count: number; my_tweets: Timeline[] }>(this.baseUrl + 'my-tweets')
      .subscribe((res: { count: number; my_tweets: Timeline[] }) => {
        if (res) {
          this.tweetsSub.next(res.my_tweets);
        }
      });
  }

  getFollowings() {
    this.httpClient
      .get<{ count: number; followings: User[] }>(this.baseUrl + 'following')
      .subscribe((res: { count: number; followings: User[] }) => {
        if (res) {
          this.followingSub.next(res.followings);
        }
      });
  }

  getFollowers() {
    this.httpClient
      .get<{ count: number; followers: User[] }>(this.baseUrl + 'followers')
      .subscribe((res: { count: number; followers: User[] }) => {
        if (res) {
          this.followersSub.next(res.followers);
        }
      });
  }

  private addNewDataInTimelineSub(newData: Timeline[]): void {
    const currentData = this.timelineSub.getValue();
    const updatedData = [...currentData, ...newData];
    this.timelineSub.next(updatedData);
  }
}
