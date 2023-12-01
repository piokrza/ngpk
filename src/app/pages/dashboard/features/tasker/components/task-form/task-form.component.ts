import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { User } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { TaskerService } from '#tasker/data-access';
import { StepForm, Task, TaskForm } from '#tasker/models';

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
  public readonly form: FormGroup<TaskForm> = this.taskerService.taskForm;
  public readonly formData: Task | undefined = inject(DynamicDialogConfig).data;

  private readonly user: Signal<User | null> = toSignal(inject(Store).select(AuthSelectors.user), { initialValue: null });

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
    this.stepsArray.push(
      new FormGroup<StepForm>({
        name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
        isComplete: new FormControl<boolean>(false, { nonNullable: true }),
      })
    );
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

  public get stepsArray(): FormArray<FormGroup<StepForm>> {
    return this.form.controls.steps;
  }
}
