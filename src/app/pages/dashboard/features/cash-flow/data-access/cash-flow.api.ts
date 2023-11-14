import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map, take } from 'rxjs';

import { Collection } from '#common/enums';
import { User } from '#common/models';
import { CashFlowUserData, CashFlow } from '#pages/dashboard/features/cash-flow/models';

@Injectable({ providedIn: 'root' })
export class CashFlowApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public addUserToDatabase$(user: User) {
    const usersCollectionRef: AngularFirestoreCollection<User> = this.angularFirestore.collection(Collection.USERS);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(
        take(1),
        map((data) => !data.exists && usersCollectionRef.doc(data.id).set(user))
      );
  }

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

  public updateUser$(updatedUserData: User): Promise<void> {
    const user: AngularFirestoreDocument<User> = this.angularFirestore.collection<User>(Collection.USERS).doc(updatedUserData.uid);

    return user.update(updatedUserData);
  }

  public updateCashFlow$(collectionName: Collection, updatedCashFlowData: CashFlow): Promise<void> {
    const cashFlow: AngularFirestoreDocument<CashFlow> = this.angularFirestore
      .collection<CashFlow>(collectionName)
      .doc(updatedCashFlowData.id);

    return cashFlow.update(updatedCashFlowData);
  }
}
