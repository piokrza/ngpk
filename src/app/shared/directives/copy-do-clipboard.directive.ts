import { Directive, ElementRef, Input, NgZone, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, switchMap, tap } from 'rxjs';

import { ToastService } from '#common/services';

@UntilDestroy()
@Directive({ selector: '[copyToClipboard]', standalone: true })
export class CopyToClipboardDirective implements OnInit {
  private readonly zone: NgZone = inject(NgZone);
  private readonly translateService = inject(TranslateService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) copyToClipboard?: string;

  public ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'click')
        .pipe(
          switchMap(() => navigator.clipboard.writeText(this.copyToClipboard ?? '')),
          tap(() => this.toastService.showMessage('success', '', this.translateService.instant('toastMessage.urlCopied'))),
          untilDestroyed(this)
        )
        .subscribe();
    });
  }
}
