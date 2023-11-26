import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { NoteForm, TaskForm, TaskStepForm } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerService {
  private readonly activeTabIndex$$ = new BehaviorSubject<number>(0);

  private readonly visibilityKey = 'isVisible';

  public get form(): FormGroup<TaskForm> {
    return new FormGroup<TaskForm>({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      steps: new FormArray<FormGroup<TaskStepForm>>([]),
    });
  }

  public addStep(taskForm: FormGroup<TaskForm>): void {
    taskForm.controls.steps.push(
      new FormGroup<TaskStepForm>({
        name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
        isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      })
    );
  }

  public getIsVisible(taskId: string): boolean {
    const visibleData = JSON.parse(sessionStorage.getItem(this.visibilityKey) || '{}');

    return visibleData.taskId === taskId ? visibleData.isVisible : false;
  }

  public setIsVisibleData(dataId: string, isVisible: boolean): void {
    sessionStorage.setItem(this.visibilityKey, JSON.stringify({ dataId, isVisible }));
  }

  public removeVisibilityData(): void {
    sessionStorage.removeItem(this.visibilityKey);
  }

  public get activeTabIndex$(): Observable<number> {
    return this.activeTabIndex$$.asObservable();
  }

  public setActiveTabIndex(idx: number): void {
    this.activeTabIndex$$.next(idx);
  }

  public get noteForm(): FormGroup<NoteForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      content: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
  }
}
