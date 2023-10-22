import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ctrl-destroy',
  template: '',
  standalone: true,
})
export abstract class DestroyComponent implements OnDestroy {
  protected readonly destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
