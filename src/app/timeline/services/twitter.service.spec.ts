import { TestBed } from '@angular/core/testing';

import { TwitterService } from './twitter.service';

describe('TimelineService', () => {
  let service: TwitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
