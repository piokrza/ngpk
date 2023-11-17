import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { TaskForm, TaskStepForm } from '#pages/dashboard/features/tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskService {
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
    const visibleData = JSON.parse(sessionStorage.getItem(this.visibilityKey) || '{}') as { taskId?: string; isVisible?: boolean };

    if (visibleData.taskId === taskId) {
      return Boolean(visibleData.isVisible);
    }

    return false;
  }

  public setIsVisibleData(taskId: string, isVisible: boolean): void {
    sessionStorage.setItem(this.visibilityKey, JSON.stringify({ taskId, isVisible }));
  }

  public removeVisibilityData(): void {
    sessionStorage.removeItem(this.visibilityKey);
  }
}
