import { AsyncPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Observable, first, map, switchMap, tap } from 'rxjs';

import { DateFormats } from '@ngpk/core/enum';
import { TimestampPipe } from '@ngpk/core/pipe';
import { connectState } from '@ngpk/core/util';
import { OrganizerPaths } from '@ngpk/organizer/enum';
import { CashFlow, Category } from '@ngpk/organizer/model';
import { CashFlowFacadeService } from '@ngpk/organizer/service';
import { ConfigSelectors } from '@ngpk/organizer/state/config';
import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [TranslateModule, AsyncPipe, TimestampPipe, ContainerComponent, ButtonModule];

@Component({
  selector: 'ngpk-details',
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class DetailsComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cashFlowFacade = inject(CashFlowFacadeService);

  readonly state = connectState(this.destroyRef, {
    details: this.cashFlowDetails$,
    currency: this.store.select(ConfigSelectors.currency),
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly DateFormats: typeof DateFormats = DateFormats;

  updateCashFlow(cashFlow: CashFlow): void {
    this.cashFlowFacade.updateCashFlow$(cashFlow).pipe(first()).subscribe();
  }

  deleteCashFlow(id: string): void {
    this.cashFlowFacade.deleteCashFlow(id);
  }

  navigateBack(): void {
    this.location.back();
  }

  get categoryLabel$(): Observable<string | undefined> {
    return this.store
      .select(ConfigSelectors.cashFlowCategories())
      .pipe(map((categories) => categories.find(({ id }: Category) => id === this.state.details?.categoryId)?.name));
  }

  private get cashFlowDetails$(): Observable<CashFlow | undefined> {
    return this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.cashFlowFacade.getCashFlowById$(params['id'] as string)),
      tap((cashFlow) => !cashFlow && this.router.navigate([OrganizerPaths.CASH_FLOW]))
    );
  }
}
