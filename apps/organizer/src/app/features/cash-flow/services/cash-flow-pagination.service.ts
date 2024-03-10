import { Injectable } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { BehaviorSubject, Observable } from 'rxjs';

import { initialPaginationData } from '@ngpk/core/constant';

import { CashFlowFeatureName } from '#cash-flow/enum';

@Injectable()
export class CashFlowPaginationService {
  private readonly incomesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState(CashFlowFeatureName.INCOMES));
  private readonly expensesPaginatorState$$ = new BehaviorSubject<PaginatorState>(this.getPaginationState(CashFlowFeatureName.EXPENSES));

  setIncomesPaginatorState(paginatorState: PaginatorState): void {
    this.incomesPaginatorState$$.next(paginatorState);
    sessionStorage.setItem(CashFlowFeatureName.INCOMES, JSON.stringify(paginatorState));
  }

  get incomesPaginatorState$(): Observable<PaginatorState> {
    return this.incomesPaginatorState$$.asObservable();
  }

  setExpensesPaginatorState(paginatorState: PaginatorState): void {
    this.expensesPaginatorState$$.next(paginatorState);
    sessionStorage.setItem(CashFlowFeatureName.EXPENSES, JSON.stringify(paginatorState));
  }

  get expensesPaginatorState$(): Observable<PaginatorState> {
    return this.expensesPaginatorState$$.asObservable();
  }

  private getPaginationState(featureName: CashFlowFeatureName): PaginatorState {
    let paginatorState: PaginatorState | undefined;

    if (sessionStorage.getItem(featureName)?.length) {
      paginatorState = JSON.parse(sessionStorage.getItem(featureName) ?? '');
    }

    return paginatorState ?? initialPaginationData;
  }
}
