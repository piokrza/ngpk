import { Injectable, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LabeledData } from '#common/models';
import { NoteForm, StepForm, TaskFilter, TaskForm } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerService {
  readonly #translate: TranslateService = inject(TranslateService);

  private readonly activeTabIndex$$ = new BehaviorSubject<number>(0);

  public setActiveTabIndex(idx: number): void {
    this.activeTabIndex$$.next(idx);
  }

  public get activeTabIndex$(): Observable<number> {
    return this.activeTabIndex$$.asObservable();
  }

  public get taskForm(): FormGroup<TaskForm> {
    return new FormGroup<TaskForm>({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      steps: new FormArray<FormGroup<StepForm>>([], { validators: Validators.maxLength(5) }),
    });
  }

  public get noteForm(): FormGroup<NoteForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      content: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  public get taskFilters(): LabeledData<TaskFilter>[] {
    const filters: TaskFilter[] = ['all', 'completed', 'notCompleted'];

    return filters.map((name) => ({
      label: this.#translate.instant(`tasker.filter.${name}`),
      data: name,
    }));
  }
}
