import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  public set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
