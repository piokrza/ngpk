import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Collection } from '@common/enums/collection.enum';
import { CashFlowUserData } from '@app/features/cash-flow/models/cash-flow-user-data.model';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  http = inject(HttpClient);
  private angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadUserCashFlowData$(uid: string): Observable<CashFlowUserData> {
    const expenses$: AngularFirestoreCollection<CashFlow> = this.angularFirestore.collection<CashFlow>(
      Collection.EXPENSES,
      (ref) => ref.where('uid', '==', uid)
    );

    const incomes$: AngularFirestoreCollection<CashFlow> = this.angularFirestore.collection<CashFlow>(
      Collection.INCOMES,
      (ref) => ref.where('uid', '==', uid)
    );

    return expenses$.valueChanges().pipe(
      combineLatestWith(incomes$.valueChanges()),
      map(([expenses, incomes]: [CashFlow[], CashFlow[]]): CashFlowUserData => {
        return {
          expenses,
          incomes,
        };
      })
    );
  }
}
