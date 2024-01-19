import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { CashFlow } from '#cash-flow/models';
import { Collection } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class CashFlowApiService {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  loadExpenses$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(Collection.EXPENSES, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  loadIncomes$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(Collection.INCOMES, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  async addCashFlow$(collectionName: Collection.EXPENSES | Collection.INCOMES, cashFlow: CashFlow): Promise<DocumentReference<CashFlow>> {
    return await this.angularFirestore.collection<CashFlow>(collectionName).add(cashFlow);
  }

  async removeCashFlow$(collectionName: Collection.EXPENSES | Collection.INCOMES, cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore.collection(collectionName).doc(cashFlowId);

    return await cashFlow.delete();
  }

  async updateCashFlow$(collectionName: Collection.EXPENSES | Collection.INCOMES, updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(collectionName)
      .doc(updatedCashFlowData.id);

    return await cashFlow.update(updatedCashFlowData);
  }
}
