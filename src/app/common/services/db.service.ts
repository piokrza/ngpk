import { inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { CashFlowUserData } from '@features/cash-flow/models/cash-flow-user-data.model';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { Observable, combineLatestWith, map } from 'rxjs';
import { Collection } from '@common/enums/collection.enum';

@Injectable({ providedIn: 'root' })
export class DbService {
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

    return expenses$.valueChanges({ idField: 'id' }).pipe(
      combineLatestWith(incomes$.valueChanges({ idField: 'id' })),
      map(([expenses, incomes]: [CashFlow[], CashFlow[]]): CashFlowUserData => {
        return {
          expenses,
          incomes,
        };
      })
    );
  }

  public addCashFlow$(collectionName: Collection, cashFlow: CashFlow): Promise<DocumentReference<CashFlow>> {
    return this.angularFirestore.collection<CashFlow>(collectionName).add(cashFlow);
  }

  public removeCashFlow$(collectionName: Collection, cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection(collectionName)
      .doc(cashFlowId);

    return cashFlow.delete();
  }
}
