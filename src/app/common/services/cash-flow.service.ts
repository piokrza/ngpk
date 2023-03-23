import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  private http: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);

  public getIncomes$(): Observable<CashFlow[]> {
    return this.http.get<CashFlow[]>('assets/mock-meta/incomes.json');
  }

  public getExpenses$(): Observable<CashFlow[]> {
    return this.http.get<CashFlow[]>('assets/mock-meta/expenses.json');
  }
}
