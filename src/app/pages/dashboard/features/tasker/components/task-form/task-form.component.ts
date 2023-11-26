import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { User } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { TaskerService } from '#tasker/data-access';
import { Task, TaskForm, TaskStepForm } from '#tasker/models';

@Component({
  selector: 'ctrl-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private readonly taskerService: TaskerService = inject(TaskerService);
  private readonly firestore: AngularFirestore = inject(AngularFirestore);

  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly form: FormGroup<TaskForm> = this.taskerService.form;
  public readonly formData: Task | undefined = inject(DynamicDialogConfig).data;

  private readonly user: Signal<User | null | undefined> = toSignal(inject(Store).select(AuthSelectors.user));

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newTask: Task = {
      ...this.form.getRawValue(),
      id: this.firestore.createId(),
      uid: this.user()?.uid ?? '',
      steps: [...this.form.controls.steps.getRawValue().map((step) => ({ ...step, id: this.firestore.createId() }))],
    };

    this.dialogRef.close(newTask);
  }

  public addStep(): void {
    this.taskerService.addStep(this.form);
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
