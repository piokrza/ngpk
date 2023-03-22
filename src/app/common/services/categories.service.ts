import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categories } from '@common/models/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http: HttpClient = inject(HttpClient);

  public getCategories$(): Observable<Categories> {
    return this.http.get<Categories>('assets/mock-meta/categories.json');
  }
}
