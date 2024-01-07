import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UserConfig } from '#auth/models';

@Injectable({ providedIn: 'root' })
export class UserConfigService {
  readonly #firestore = inject(AngularFirestore);

  public get initialUserConfig(): UserConfig {
    return Object.freeze({
      categories: {
        incomes: [
          { name: 'Concerts', id: this.#firestore.createId() },
          { name: 'Salary', id: this.#firestore.createId() },
          { name: 'Gifts', id: this.#firestore.createId() },
          { name: 'Other', id: this.#firestore.createId() },
        ],
        expenses: [
          { name: 'Rental fees', id: this.#firestore.createId() },
          { name: 'Entertainment', id: this.#firestore.createId() },
          { name: 'General', id: this.#firestore.createId() },
          { name: 'Other', id: this.#firestore.createId() },
        ],
      },
      language: 'en',
      currency: 'PLN',
    });
  }
}
