import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PaginatorState } from 'primeng/paginator';

import { CashFlowFeatureName } from '#cash-flow/models';
import { initialPaginationData } from '#core/constants';

@Injectable()
export class CashFlowPaginationService {
  private readonly incomesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState('incomes'));
  private readonly expensesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState('expenses'));

  public setIncomesPaginatorState(paginatorState: PaginatorState): void {
    this.incomesPaginatorState$$.next(paginatorState);
    this.setPaginationState('incomes', paginatorState);
  }

  public get incomesPaginatorState$(): Observable<PaginatorState> {
    return this.incomesPaginatorState$$.asObservable();
  }

  public setExpensesPaginatorState(paginatorState: PaginatorState): void {
    this.expensesPaginatorState$$.next(paginatorState);
    this.setPaginationState('expenses', paginatorState);
  }

  public get expensesPaginatorState$(): Observable<PaginatorState> {
    return this.expensesPaginatorState$$.asObservable();
  }

  private setPaginationState(featureName: CashFlowFeatureName, paginatorState: PaginatorState): void {
    sessionStorage.setItem(featureName, JSON.stringify(paginatorState));
  }

  private getPaginationState(featureName: CashFlowFeatureName): PaginatorState {
    let paginatorState: PaginatorState | undefined;

    if (sessionStorage.getItem(featureName)?.length) {
      paginatorState = JSON.parse(sessionStorage.getItem(featureName) ?? '') as PaginatorState;
    }

    return paginatorState ?? initialPaginationData;
  }
}
