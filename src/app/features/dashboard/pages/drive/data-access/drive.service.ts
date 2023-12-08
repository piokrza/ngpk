import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IFile } from '#drive/models';

@Injectable()
export class DriveService {
  private readonly parentId$$ = new BehaviorSubject<string>('');

  public setParentId(id: string): void {
    this.parentId$$.next(id);
  }

  public get parentId$(): Observable<string> {
    return this.parentId$$.asObservable();
  }

  public filterFiles(files: IFile[] | null, id: string): IFile[] {
    if (files === null) return [];

    if (!id ?? ''.length) {
      return files.filter(({ parentId }) => (parentId ?? '') === '');
    } else {
      return files.filter(({ parentId }) => parentId === id);
    }
  }
}
