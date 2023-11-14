import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import uniqid from 'uniqid';

import { User } from '#common/models';
import { TaskFormService } from '#pages/dashboard/features/tasker/data-access';
import { Task, TaskForm, TaskStepForm } from '#pages/dashboard/features/tasker/models';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private readonly taskFormService: TaskFormService = inject(TaskFormService);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly form: FormGroup<TaskForm> = this.taskFormService.form;
  public readonly formData: Task | undefined = inject(DynamicDialogConfig).data;

  private readonly user: Signal<User | null | undefined> = toSignal(inject(Store).select(AuthSelectors.user));

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newTask: Task = {
      ...this.form.getRawValue(),
      id: uniqid(),
      uid: this.user()?.uid ?? '',
      steps: [...this.form.controls.steps.getRawValue().map((step) => ({ ...step, id: uniqid() }))],
    };

    this.dialogRef.close(newTask);
  }

  public addStep(): void {
    this.taskFormService.addStep(this.form);
  }

  public removeStep(stepIdx: number): void {
    this.stepsArray?.removeAt(stepIdx);
  }

  public get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }

  public get isCompleteControl(): FormControl<boolean> {
    return this.form.controls.isComplete;
  }

  public get stepsArray(): FormArray<FormGroup<TaskStepForm>> {
    return this.form.controls.steps;
  }
}
