import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { CashFlow } from '#cash-flow/models';
import { Collection } from '#common/enums';

@Injectable({ providedIn: 'root' })
export class CashFlowApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadExpenses$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(Collection.EXPENSES, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  public loadIncomes$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(Collection.INCOMES, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
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
