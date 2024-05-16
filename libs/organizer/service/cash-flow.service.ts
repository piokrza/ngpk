import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { cashFlowActiveTabIndex } from '@ngpk/core/constant';
import { CashFlow, CashFlowData, CashFlowForm } from '@ngpk/organizer/model';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  private readonly activeTabIndex$$ = new BehaviorSubject<number>(parseInt(sessionStorage.getItem(cashFlowActiveTabIndex) ?? '0'));

  get activeTabIndex$(): Observable<number> {
    return this.activeTabIndex$$.asObservable();
  }

  setActiveTabIndex(idx: number): void {
    this.activeTabIndex$$.next(idx);
    sessionStorage.setItem(cashFlowActiveTabIndex, `${idx}`);
  }

  get form(): FormGroup<CashFlowForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      amount: new FormControl<number>(0, { validators: [Validators.required], nonNullable: true }),
      date: new FormControl<Date>(new Date(), { validators: [Validators.required] }),
      categoryId: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
    });
  }

  setCashFlowData(cashFlow$: Observable<CashFlow[]>, paginatorState$: Observable<PaginatorState>): Observable<CashFlowData> {
    return combineLatest({
      cashFlow: cashFlow$,
      paginatorState: paginatorState$,
    }).pipe(
      map(({ cashFlow, paginatorState }) => ({
        paginatorState,
        totalLength: cashFlow.length,
        paginatedCashFlow: cashFlow.slice(paginatorState.first, (paginatorState.first ?? 0) + (paginatorState?.rows ?? 0)),
      }))
    );
  }
}
