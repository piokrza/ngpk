import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService, private ngZone: NgZone) {}

  public showMessage(severity: string, summary: string, detail: string): void {
    this.ngZone.run(() => {
      this.messageService.clear();
      this.messageService.add({
        severity,
        summary,
        detail,
        life: 5000,
      });

      setTimeout((): void => {
        this.messageService.clear();
      }, 5000);
    });
  }
}
