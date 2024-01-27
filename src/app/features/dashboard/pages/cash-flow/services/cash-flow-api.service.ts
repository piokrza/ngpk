import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { CashFlow } from '#cash-flow/models';
import { Collection } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class CashFlowApiService {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  loadCashFlow$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(Collection.CASHFLOW, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  async addCashFlow$(cashFlow: CashFlow): Promise<DocumentReference<CashFlow>> {
    return await this.angularFirestore.collection<CashFlow>(Collection.CASHFLOW).add(cashFlow);
  }

  async removeCashFlow$(cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore.collection(Collection.CASHFLOW).doc(cashFlowId);

    return await cashFlow.delete();
  }

  async updateCashFlow$(updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(Collection.CASHFLOW)
      .doc(updatedCashFlowData.id);

    return await cashFlow.update(updatedCashFlowData);
  }
}
