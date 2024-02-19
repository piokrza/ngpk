import { AsyncPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, first, map, switchMap, tap } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { CashFlow, Category } from '#cash-flow/models';
import { CashFlowFacadeService } from '#cash-flow/services';
import { ConfigSelectors } from '#core/config/store';
import { AppPaths, DateFormats } from '#core/enums';
import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';
import { TimestampPipe } from '#shared/pipes';

const imports = [TranslateModule, AsyncPipe, TimestampPipe, ContainerComponent, ButtonModule];

@Component({
  selector: 'org-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowDetailsComponent {
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
      tap((cashFlow) => !cashFlow && this.router.navigate([AppPaths.CASH_FLOW]))
    );
  }
}
