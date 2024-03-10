import { DestroyRef, Directive, ElementRef, NgZone, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, switchMap, tap } from 'rxjs';

import { ToastService } from '@ngpk/core/service';

@Directive({ selector: '[copyToClipboard]', standalone: true })
export class CopyToClipboardDirective implements OnInit {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  copyToClipboard = input.required<string>();

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.elementRef.nativeElement, 'click')
        .pipe(
          switchMap((): Promise<void> => navigator.clipboard.writeText(this.copyToClipboard() ?? '')),
          tap(() => this.toastService.showMessage('success', '', this.translateService.instant('toastMessage.urlCopied'))),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    });
  }
}
