import { Component, OnInit } from '@angular/core';
import { TwitterService } from './timeline/services/twitter.service';
import { UsersService } from './users/users.service';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'twitter-clone';
  activeUrl = '';
  currentUrl = '';
  isLogging: boolean = false;

  constructor(
    private twitterService: TwitterService,
    private userService: UsersService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url;

        if (this.storageService.retrieveFromLocal('token'))
          this.isLogging = true;

        if (this.activeUrl.includes('login')) this.isLogging = false;
        else if (this.activeUrl.includes('signup')) this.isLogging = false;
      }
    });
  }

  ngOnInit() {
    this.twitterService.getTimeLine();
    this.userService.getCalculatedUsersList();
  }
}
