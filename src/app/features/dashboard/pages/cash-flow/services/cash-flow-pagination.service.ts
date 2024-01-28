import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PaginatorState } from 'primeng/paginator';

import { CashFlowFeatureName } from '#cash-flow/models';
import { initialPaginationData } from '#core/constants';

@Injectable()
export class CashFlowPaginationService {
  private readonly incomesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState('incomes'));
  private readonly expensesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState('expenses'));

  setIncomesPaginatorState(paginatorState: PaginatorState): void {
    this.incomesPaginatorState$$.next(paginatorState);
    sessionStorage.setItem('incomes', JSON.stringify(paginatorState));
  }

  get incomesPaginatorState$(): Observable<PaginatorState> {
    return this.incomesPaginatorState$$.asObservable();
  }

  setExpensesPaginatorState(paginatorState: PaginatorState): void {
    this.expensesPaginatorState$$.next(paginatorState);
    sessionStorage.setItem('expenses', JSON.stringify(paginatorState));
  }

  get expensesPaginatorState$(): Observable<PaginatorState> {
    return this.expensesPaginatorState$$.asObservable();
  }

  private getPaginationState(featureName: CashFlowFeatureName): PaginatorState {
    let paginatorState: PaginatorState | undefined;

    if (sessionStorage.getItem(featureName)?.length) {
      paginatorState = JSON.parse(sessionStorage.getItem(featureName) ?? '') as PaginatorState;
    }

    return paginatorState ?? initialPaginationData;
  }
}
