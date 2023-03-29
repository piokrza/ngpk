import { inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Collection } from '@common/enums/collection.enum';
import { User } from '@common/models/user.model';
import { CashFlowUserData } from '@features/cash-flow/models/cash-flow-user-data.model';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { Observable, combineLatestWith, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbService {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public addUserToDatabase$(user: User) {
    const usersCollectionRef: AngularFirestoreCollection<User> = this.angularFirestore.collection(Collection.USERS);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(
        take(1),
        map((data): false | Promise<void> => !data.exists && usersCollectionRef.doc(data.id).set(user))
      );
  }

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
      take(1),
      map(([expenses, incomes]: [CashFlow[], CashFlow[]]): CashFlowUserData => ({ expenses, incomes }))
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

  public updateUser$(updatedUserData: User) {
    const user = this.angularFirestore.collection<User>(Collection.USERS).doc(updatedUserData.uid);

    return user.update(updatedUserData);
  }
}
