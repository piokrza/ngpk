import { ChangeDetectionStrategy, Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, interval, takeWhile, tap } from 'rxjs';

const imports = [TranslateModule];

@Component({
  selector: 'ngpk-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class PageNotFoundComponent implements OnInit {
  private readonly router = inject(Router);

  readonly #count = signal(8);
  readonly count: Signal<number> = this.#count.asReadonly();

  ngOnInit(): void {
    interval(1000)
      .pipe(
        tap(() => this.#count.update((count) => count - 1)),
        takeWhile(() => this.count() > 0),
        finalize(() => this.router.navigate(['']))
      )
      .subscribe();
  }
}
