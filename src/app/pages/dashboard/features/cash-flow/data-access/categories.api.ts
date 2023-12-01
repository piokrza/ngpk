import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { Categories } from '#cash-flow/models';
import { Collection } from '#common/enums';

@Injectable({ providedIn: 'root' })
export class CategoriesApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public getCategories$(): Observable<Categories> {
    return this.angularFirestore
      .collection<Categories>(Collection.CATEGORIES)
      .valueChanges()
      .pipe(map((cats: Categories[]): Categories => cats[0]));
  }
}
