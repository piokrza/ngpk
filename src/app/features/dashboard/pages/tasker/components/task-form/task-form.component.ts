import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';

import { AuthSelectors } from '#store/auth';
import { StepForm, Task, TaskForm, TaskStep } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@UntilDestroy()
@Component({
  selector: 'org-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  readonly #taskerService: TaskerService = inject(TaskerService);
  readonly #firestore: AngularFirestore = inject(AngularFirestore);
  readonly #dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  readonly #taskData?: Task = inject(DynamicDialogConfig).data;

  isEditMode: boolean = false;
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

  public ngOnInit(): void {
    if (this.#taskData) {
      this.isEditMode = true;

      this.form.patchValue({
        name: this.#taskData.name,
        isComplete: this.#taskData.isComplete,
      });

      if (this.#taskData.steps.length) {
        this.#taskData.steps.forEach(({ name, isComplete }) => this.addStep({ name, isComplete }));
      }
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    if (this.isEditMode && this.form.dirty) {
      this.#dialogRef.close({
        ...this.form.getRawValue(),
        id: this.#taskData!.id,
        uid: this.#taskData!.uid,
        steps: this.stepsArray.getRawValue().map((updatedStep) => ({ ...updatedStep, id: this.#firestore.createId() })),
      } satisfies Task);
      return;
    }

    this.#dialogRef.close({
      ...this.form.getRawValue(),
      id: this.#firestore.createId(),
      uid: this.#userId,
      steps: this.form.controls.steps.getRawValue().map((step) => ({ ...step, id: this.#firestore.createId() })),
    } satisfies Task);
  }

  public addStep(step?: Partial<TaskStep>): void {
    this.stepsArray.push(
      new FormGroup<StepForm>({
        name: new FormControl<string>(step?.name ?? '', { validators: [Validators.required], nonNullable: true }),
        isComplete: new FormControl<boolean>(step?.isComplete ?? false, { nonNullable: true }),
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
