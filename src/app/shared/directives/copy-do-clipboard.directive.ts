import { Directive, ElementRef, Input, NgZone, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, switchMap, tap } from 'rxjs';

import { ToastService } from '#core/services';

@UntilDestroy()
@Directive({ selector: '[copyToClipboard]', standalone: true })
export class CopyToClipboardDirective implements OnInit {
  private readonly zone = inject(NgZone);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) copyToClipboard!: string;

  public ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.elementRef.nativeElement, 'click')
        .pipe(
          switchMap((): Promise<void> => navigator.clipboard.writeText(this.copyToClipboard ?? '')),
          tap(() => this.toastService.showMessage('success', '', this.translateService.instant('toastMessage.urlCopied'))),
          untilDestroyed(this)
        )
        .subscribe();
    });
  }
}
