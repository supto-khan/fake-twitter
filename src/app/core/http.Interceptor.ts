import { Injectable } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = '';
    if (!req.url.includes('login') || !req.url.includes('signup')) {
      if (this.storageService.retrieveFromLocal('token')) {
        token = this.storageService.retrieveFromLocal('token');
      }
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          'X-Jwt-Token': `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.storageService.clearFromLocal('token');
          window.location.href =
            this.storageService.retrieveFromLocal('redirect-url');
        }

        if (error instanceof HttpErrorResponse) {
          if (error.error?.data?.errors) {
            let message = '';
            let index = 0;
            for (let aObj in error.error?.data?.errors) {
              index = index + 1;
              message += index + '. ' + error.error.data.errors[aObj] + '\n';
            }
            this.notificationService.error(message);
          } else if (error.status == 0) {
            this.notificationService.error(
              'Timeout. Please contact with dev team'
            );
          } else {
            this.notificationService.error(error.error.message);
          }

          return throwError(error);
        } else {
          this.notificationService.error('Please try after some time');
          return throwError(error);
        }
      })
    );
  }
}
