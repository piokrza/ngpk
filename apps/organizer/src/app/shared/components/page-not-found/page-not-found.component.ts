import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, interval, takeWhile, tap } from 'rxjs';

const imports = [TranslateModule];

@Component({
  selector: 'org-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class PageNotFoundComponent implements OnInit {
  private readonly router = inject(Router);

  readonly count: WritableSignal<number> = signal(8);

  ngOnInit(): void {
    interval(1000)
      .pipe(
        tap(() => this.count.update((count) => count - 1)),
        takeWhile(() => this.count() > 0),
        finalize(() => this.router.navigate(['']))
      )
      .subscribe();
  }
}
