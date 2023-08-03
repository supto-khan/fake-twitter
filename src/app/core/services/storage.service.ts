import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private localStorageService: LocalStorageService) {}

  saveToLocal(key: string, value: string) {
    this.localStorageService.store(key, value);
  }

  retrieveFromLocal(key: string) {
    return this.localStorageService.retrieve(key);
  }

  clearFromLocal(key: string) {
    return this.localStorageService.clear(key);
  }
}
