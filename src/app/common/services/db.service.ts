import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CashFlow } from '@common/models/cash-flow.model';
import firebase from 'firebase/compat';

@Injectable({ providedIn: 'root' })
export class DbService {
  firestore: Firestore = inject(Firestore);

  public addIncome(income: CashFlow) {}

  public getUserData$(user: firebase.User | null) {}
}
