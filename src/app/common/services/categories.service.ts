import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collection } from '@common/enums/collection.enum';
import { Categories } from '@common/models/category.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public getCategories$(): Observable<Categories> {
    return this.angularFirestore
      .collection<Categories>(Collection.CATEGORIES)
      .valueChanges()
      .pipe(map((cats: Categories[]): Categories => cats[0]));
  }
}
