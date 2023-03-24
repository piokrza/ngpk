import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DbService {
  firestore: Firestore = inject(Firestore);

  public addIncome(income: any) {
    console.log(income);
  }
}
