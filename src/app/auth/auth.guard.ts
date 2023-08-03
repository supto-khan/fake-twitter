import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import jwtDecode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.retrieveFromLocal('token');

  if (checkTokenExpiration(token)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

function checkTokenExpiration(token: string): boolean {
  try {
    const decodedToken: any = jwtDecode(token);

    const expirationTime = decodedToken.exp;

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime >= expirationTime;
  } catch (error) {
    return true;
  }
}
