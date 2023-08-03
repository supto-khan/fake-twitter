import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public twitterService: TwitterService) {}

  ngOnInit(): void {
    this.twitterService.getTweets();
    this.twitterService.getFollowers();
    this.twitterService.getFollowings();
  }
}
