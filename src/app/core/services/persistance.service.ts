import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }

  get<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '') as T;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
