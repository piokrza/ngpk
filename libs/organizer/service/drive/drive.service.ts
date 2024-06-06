import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IFile } from '@ngpk/organizer/model';

@Injectable()
export class DriveService {
  private readonly parentId$$ = new BehaviorSubject<string>('');

  setParentId(id: string): void {
    this.parentId$$.next(id);
  }

  get parentId$(): Observable<string> {
    return this.parentId$$.asObservable();
  }

  filterFiles(files: IFile[], parentId: string): IFile[] {
    return files.filter((file) => (parentId.length ? file.parentId === parentId : file.parentId === ''));
  }
}
