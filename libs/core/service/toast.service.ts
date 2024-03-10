import { inject, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly ngZone = inject(NgZone);
  private readonly messageService = inject(MessageService);

  private readonly duration = 5000;

  showMessage(severity: string, summary: string, detail: string): void {
    this.ngZone.run(() => {
      this.messageService.clear();
      this.messageService.add({ severity, summary, detail, life: this.duration });

      setTimeout(() => this.messageService.clear(), this.duration);
    });
  }
}
