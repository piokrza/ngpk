import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly visibilityKey = 'isVisible';

  public getIsVisible(taskId: string): boolean {
    const visibleData = JSON.parse(sessionStorage.getItem(this.visibilityKey) || '{}') as { taskId?: string; isVisible?: boolean };

    if (visibleData.taskId === taskId) {
      return !!visibleData.isVisible;
    }

    return false;
  }

  public setIsVisibleData(taskId: string, isVisible: boolean): void {
    sessionStorage.setItem(this.visibilityKey, JSON.stringify({ taskId, isVisible }));
  }

  public removeVisibilityData(): void {
    sessionStorage.removeItem(this.visibilityKey);
  }
}
