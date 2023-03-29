import { inject, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageService: MessageService = inject(MessageService);
  private readonly ngZone: NgZone = inject(NgZone);

  public showMessage(severity: string, summary: string, detail: string): void {
    this.ngZone.run((): void => {
      this.messageService.clear();
      this.messageService.add({
        severity,
        summary,
        detail,
        life: 5000,
      });

      setTimeout((): void => {
        this.messageService.clear();
      }, 3000);
    });
  }
}
