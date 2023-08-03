import { Component, OnDestroy, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';
import { Subscription, switchMap } from 'rxjs';
import { Timeline } from '../interface/timeline.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnDestroy {
  public timelinesData: Timeline[] = [];
  public length: number = 0;
  public count: number = 1;

  private subs: Subscription[] = [];

  constructor(public twitterService: TwitterService) {}

  ngOnInit() {
    this.getTimeLine();
  }

  getTimeLine() {
    this.subs.push(
      this.twitterService.timelineSub.subscribe((timelines: Timeline[]) => {
        if (timelines) {
          this.timelinesData = timelines;
        }
      })
    );
  }

  paginationInfo() {
    this.twitterService.getTimeLine(10, this.count++);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
