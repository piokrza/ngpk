import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { OrganizerCollection } from '@ngpk/organizer/enum';
import { CashFlow } from '@ngpk/organizer/model';

@Injectable({ providedIn: 'root' })
export class CashFlowApiService {
  private readonly angularFirestore = inject(AngularFirestore);

  loadCashFlow$(uid: string): Observable<CashFlow[]> {
    return this.angularFirestore
      .collection<CashFlow>(OrganizerCollection.CASHFLOW, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  async addCashFlow$(cashFlow: CashFlow): Promise<DocumentReference<CashFlow>> {
    return await this.angularFirestore.collection<CashFlow>(OrganizerCollection.CASHFLOW).add(cashFlow);
  }

  async deleteCashFlow$(cashFlowId: string): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore.collection(OrganizerCollection.CASHFLOW).doc(cashFlowId);

    return await cashFlow.delete();
  }

  async updateCashFlow$(updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(OrganizerCollection.CASHFLOW)
      .doc(updatedCashFlowData.id);

    return await cashFlow.update(updatedCashFlowData);
  }
}
