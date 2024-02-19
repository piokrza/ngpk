import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable, first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TabViewChangeEvent } from 'primeng/tabview';

import { CashFlow } from '#cash-flow/models';
import { CashFlowFacadeService, OverviewService } from '#cash-flow/services';
import { rowsPerPageOptions } from '#core/constants';
import { TitleService } from '#core/services';
import { connectState } from '#core/utils';

@Component({
  selector: 'org-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly titleService = inject(TitleService);
  private readonly overviewService = inject(OverviewService);
  private readonly cashFlowFacadeService = inject(CashFlowFacadeService);

  readonly state = connectState(this.destroyRef, {
    incomes: this.cashFlowFacadeService.incomesDataset$,
    incomesCategories: this.cashFlowFacadeService.getCategories('income'),
    expenses: this.cashFlowFacadeService.expensesDataset$,
    expensesCategories: this.cashFlowFacadeService.getCategories('expense'),
    isLoading: this.cashFlowFacadeService.isLoading$,
  });

  readonly overviewState = connectState(this.destroyRef, this.overviewService.state);

  readonly activeTabIndex$: Observable<number> = this.cashFlowFacadeService.activeTabIndex$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly rowsPerPageOptions: number[] = rowsPerPageOptions;

  ngOnInit(): void {
    this.titleService.setTitle('cashFlow');
  }

  addCashFlow(isIncomeMode: boolean): void {
    this.cashFlowFacadeService.openCashFlowDialog$(isIncomeMode).pipe(first()).subscribe();
  }

  updateCashFlow(cashFlow: CashFlow): void {
    this.cashFlowFacadeService.updateCashFlow$(cashFlow).pipe(first()).subscribe();
  }

  deleteCashFlow(id: string): void {
    this.cashFlowFacadeService.deleteCashFlow(id);
  }

  incomesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setIncomesCategoryFilter(categoryIds);
  }

  expensesCategoryChange(categoryIds: string[]): void {
    this.cashFlowFacadeService.setExpensesCategoryFilter(categoryIds);
  }

  incomesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setIncomesPaginatorState(event);
  }

  expensesPageChange(event: PaginatorState): void {
    this.cashFlowFacadeService.setExpensesPaginatorState(event);
  }

  setActiveIndex(event: TabViewChangeEvent): void {
    this.cashFlowFacadeService.setActiveTabIndex(event.index);
  }
}
