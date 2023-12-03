import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { interval, takeWhile, tap } from 'rxjs';

import { AppPaths } from '#common/enums';

const imports = [TranslateModule];

@Component({
  selector: 'ctrl-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export default class PageNotFoundComponent implements OnInit {
  private readonly router: Router = inject(Router);

  public count: WritableSignal<number> = signal(8);

  public ngOnInit(): void {
    interval(1000)
      .pipe(
        tap(() => {
          this.count.set(this.count() - 1);
          this.count() === 0 && this.router.navigate([AppPaths.DASHBOARD]);
        }),
        takeWhile(() => this.count() > 0)
      )
      .subscribe();
  }
}
