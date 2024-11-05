import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly #messageService = inject(MessageService);

  showInfoMessage(severity: string, summary: string, detail: string): void {
    this.#messageService.clear();
    this.#messageService.add({
      severity,
      summary,
      detail,
    });

    setTimeout(() => {
      this.#messageService.clear();
    }, 5000);
  }
}
