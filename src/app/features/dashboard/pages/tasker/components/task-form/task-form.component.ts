import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';

import { AuthSelectors } from '#store/auth';
import { StepForm, Task, TaskForm } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@UntilDestroy()
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

  #userId: string = '';

  public constructor() {
    inject(Store)
      .select(AuthSelectors.user)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe({ next: ({ uid }) => (this.#userId = uid) });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.#dialogRef.close({
      ...this.form.getRawValue(),
      id: this.#firestore.createId(),
      uid: this.#userId,
      steps: [...this.form.controls.steps.getRawValue().map((step) => ({ ...step, id: this.#firestore.createId() }))],
    } satisfies Task);
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
