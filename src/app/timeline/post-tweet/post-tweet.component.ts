import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TwitterService } from '../services/twitter.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.scss'],
})
export class PostTweetComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public postForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.maxLength(160)]),
  });

  constructor(
    private twitterService: TwitterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  addNewTweet() {
    let rawData = this.postForm.getRawValue();
    this.twitterService.postTweet(rawData);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
