import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map, take } from 'rxjs';

import { CashFlowUserData, CashFlow } from '#cash-flow/models';
import { Collection } from '#common/enums';

@Injectable({ providedIn: 'root' })
export class CashFlowApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadUserCashFlowData$(uid: string): Observable<CashFlowUserData> {
    const expenses$: AngularFirestoreCollection<CashFlow> = this.angularFirestore.collection<CashFlow>(Collection.EXPENSES, (ref) =>
      ref.where('uid', '==', uid)
    );

    const incomes$: AngularFirestoreCollection<CashFlow> = this.angularFirestore.collection<CashFlow>(Collection.INCOMES, (ref) =>
      ref.where('uid', '==', uid)
    );

    return combineLatest({
      expenses: expenses$.valueChanges({ idField: 'id' }),
      incomes: incomes$.valueChanges({ idField: 'id' }),
    }).pipe(
      take(1),
      map(({ expenses, incomes }): CashFlowUserData => ({ expenses, incomes }))
    );
  }

  public addCashFlow$(collectionName: Collection, cashFlow: CashFlow): Promise<DocumentReference<CashFlow>> {
    return this.angularFirestore.collection<CashFlow>(collectionName).add(cashFlow);
  }

  public removeCashFlow$(collectionName: Collection, cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore.collection(collectionName).doc(cashFlowId);

    return cashFlow.delete();
  }

  public updateCashFlow$(collectionName: Collection, updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(collectionName)
      .doc(updatedCashFlowData.id);

    return cashFlow.update(updatedCashFlowData);
  }
}