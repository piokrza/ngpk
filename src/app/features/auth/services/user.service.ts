import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { EMPTY, from, switchMap } from 'rxjs';

import { IUser, UserConfig } from '#auth/models';
import { Collection } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly firestore = inject(AngularFirestore);
  private readonly angularFirestore = inject(AngularFirestore);

  public addUserToDatabase$(user: Partial<IUser>) {
    const usersCollectionRef: AngularFirestoreCollection<IUser> = this.angularFirestore.collection(Collection.USERS);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(
        switchMap((data) => {
          return !data.exists
            ? from(
                usersCollectionRef.doc(user.uid).set({
                  displayName: user.displayName!,
                  email: user.email!,
                  phoneNumber: user.phoneNumber!,
                  photoURL: user.photoURL!,
                  uid: user.uid!,
                  config: this.initialUserConfig,
                })
              )
            : EMPTY;
        })
      );
  }

  public async updateUser$(updatedUserData: IUser): Promise<void> {
    const user: AngularFirestoreDocument<IUser> = this.angularFirestore.collection<IUser>(Collection.USERS).doc(updatedUserData.uid);
    return await user.update(updatedUserData);
  }

  public getIUserModel(user: firebase.User): Partial<IUser> {
    return { displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, photoURL: user.photoURL, uid: user.uid };
  }

  private get initialUserConfig(): UserConfig {
    return Object.freeze({
      categories: {
        incomes: [
          { name: 'Concerts', id: this.firestore.createId() },
          { name: 'Salary', id: this.firestore.createId() },
          { name: 'Gifts', id: this.firestore.createId() },
          { name: 'Other', id: this.firestore.createId() },
        ],
        expenses: [
          { name: 'Rental fees', id: this.firestore.createId() },
          { name: 'Entertainment', id: this.firestore.createId() },
          { name: 'General', id: this.firestore.createId() },
          { name: 'Other', id: this.firestore.createId() },
        ],
      },
      language: 'en',
      currency: 'PLN',
    });
  }
}
