import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map } from 'rxjs';

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
      // TODO: separate to own http calls
      expenses: expenses$.valueChanges({ idField: 'id' }),
      incomes: incomes$.valueChanges({ idField: 'id' }),
    }).pipe(map(({ expenses, incomes }): CashFlowUserData => ({ expenses, incomes })));
  }

  public async addCashFlow$(
    collectionName: Collection.EXPENSES | Collection.INCOMES,
    cashFlow: CashFlow
  ): Promise<DocumentReference<CashFlow>> {
    return await this.angularFirestore.collection<CashFlow>(collectionName).add(cashFlow);
  }

  public async removeCashFlow$(collectionName: Collection.EXPENSES | Collection.INCOMES, cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore.collection(collectionName).doc(cashFlowId);

    return await cashFlow.delete();
  }

  public async updateCashFlow$(collectionName: Collection.EXPENSES | Collection.INCOMES, updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(collectionName)
      .doc(updatedCashFlowData.id);

    return await cashFlow.update(updatedCashFlowData);
  }
}
