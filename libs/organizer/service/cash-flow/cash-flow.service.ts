import { Injectable, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { Observable, combineLatest, map } from 'rxjs';

import { cashFlowActiveTabIndex } from '@ngpk/organizer/constant';
import { CashFlow, CashFlowData, CashFlowForm } from '@ngpk/organizer/model';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  readonly #activeTabIndex = signal<number>(parseInt(sessionStorage.getItem(cashFlowActiveTabIndex) ?? '0'));

  get activeTabIndex(): Signal<number> {
    return this.#activeTabIndex.asReadonly();
  }

  setActiveTabIndex(idx: number): void {
    this.#activeTabIndex.set(idx);
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
