import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { StepForm, Task, TaskForm } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@Component({
  selector: 'org-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  readonly #taskerService: TaskerService = inject(TaskerService);
  readonly #firestore: AngularFirestore = inject(AngularFirestore);
  readonly #dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly form: FormGroup<TaskForm> = this.#taskerService.taskForm;
  readonly formData: Task | undefined = inject(DynamicDialogConfig).data;

  private readonly user: Signal<IUser | null> = toSignal(inject(Store).select(AuthSelectors.user), { initialValue: null });

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newTask: Task = {
      ...this.form.getRawValue(),
      id: this.#firestore.createId(),
      uid: this.user()?.uid ?? '',
      steps: [...this.form.controls.steps.getRawValue().map((step) => ({ ...step, id: this.#firestore.createId() }))],
    };

    this.#dialogRef.close(newTask);
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
