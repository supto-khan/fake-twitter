import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environments';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private storageService: StorageService
  ) {}

  signUp(data: any) {
    this.httpClient.post(this.baseUrl + 'signup', data).subscribe({
      next: (res: any) => {
        this.notificationService.success(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.notificationService.error(err.error.error);
      },
    });
  }

  login(data: any) {
    this.httpClient.post(this.baseUrl + 'login', data).subscribe({
      next: (res: any) => {
        this.notificationService.success('Login Successful');
        this.storageService.saveToLocal('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.notificationService.error(err.error.error);
      },
    });
  }
}
