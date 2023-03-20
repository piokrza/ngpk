import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@common/models/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http: HttpClient = inject(HttpClient);

  public getCategories$(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/mock-meta/categories.json');
  }
}
