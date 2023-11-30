import { Injectable, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LabelWithData } from '#common/models';
import { NoteForm, TaskFilter, TaskForm, StepForm } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerService {
  private readonly translate: TranslateService = inject(TranslateService);

  private readonly activeTabIndex$$ = new BehaviorSubject<number>(0);

  private readonly visibilityKey = 'isVisible';

  public addStep(taskForm: FormGroup<TaskForm>): void {
    taskForm.controls.steps.push(
      new FormGroup<StepForm>({
        name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
        isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      })
    );
  }

  public getIsVisible(id: string): boolean {
    const visibleData = JSON.parse(sessionStorage.getItem(this.visibilityKey) || '{}');

    return visibleData.dataId === id ? visibleData.isVisible : false;
  }

  public setIsVisible(dataId: string, isVisible: boolean): void {
    sessionStorage.setItem(this.visibilityKey, JSON.stringify({ dataId, isVisible }));
  }

  public removeVisibilityData(): void {
    sessionStorage.removeItem(this.visibilityKey);
  }

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
      steps: new FormArray<FormGroup<StepForm>>([]),
    });
  }

  public get noteForm(): FormGroup<NoteForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      content: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  public get filters(): Array<LabelWithData<TaskFilter>> {
    return [
      { label: this.translate.instant('tasker.filter.all'), data: 'all' },
      { label: this.translate.instant('tasker.filter.completed'), data: 'completed' },
      { label: this.translate.instant('tasker.filter.notCompleted'), data: 'notCompleted' },
    ];
  }
}
