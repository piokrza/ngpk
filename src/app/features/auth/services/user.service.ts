import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { EMPTY, from, iif, switchMap } from 'rxjs';

import { IUser } from '#auth/models';
import { UserConfigService } from '#auth/services';
import { Collection } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #angularFirestore = inject(AngularFirestore);
  readonly #userConfigService = inject(UserConfigService);

  public addUserToDatabase$(user: Partial<IUser>) {
    const usersCollectionRef: AngularFirestoreCollection<IUser> = this.#angularFirestore.collection(Collection.USERS);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(
        switchMap((data) => {
          return iif(
            () => !data.exists,
            from(
              usersCollectionRef.doc(user.uid).set({
                displayName: user.displayName ?? '',
                email: user.email ?? '',
                phoneNumber: user.phoneNumber ?? '',
                photoURL: user.photoURL ?? '',
                uid: user.uid ?? '',
                config: this.#userConfigService.initialUserConfig,
              })
            ),
            EMPTY
          );
        })
      );
  }

  public async updateUser$(updatedUserData: IUser): Promise<void> {
    const user: AngularFirestoreDocument<IUser> = this.#angularFirestore.collection<IUser>(Collection.USERS).doc(updatedUserData.uid);
    return await user.update(updatedUserData);
  }

  public getIUserModel(user: firebase.User): Partial<IUser> {
    return { displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, photoURL: user.photoURL, uid: user.uid };
  }
}
