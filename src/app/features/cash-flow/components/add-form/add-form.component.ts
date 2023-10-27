/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { filter, Observable, take, tap } from 'rxjs';
import uniqid from 'uniqid';

import { User } from '#common/models';
import { Category } from '#common/models/category.model';
import { BaseCashFlowForm } from '#features/cash-flow/abstract';
import { CashFlow, CashFlowForm } from '#features/cash-flow/models';
import { AuthService } from '#pages/auth/services';

@Component({
  selector: 'ctrl-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent extends BaseCashFlowForm implements OnInit {
  @Input({ required: true }) public isIncomeMode!: boolean;

  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public categories$!: Observable<Category[]>;

  public readonly trPath: string = 'cashFlow.form.';
  private userId!: string;

  public constructor() {
    super();

    inject(AuthService)
      .authState$.pipe(
        take(1),
        filter(Boolean),
        tap(({ uid }: User): string => (this.userId = uid))
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.categories$ = this.getCategories$(this.isIncomeMode);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cashFlowSubmitData.emit(<CashFlow>{
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      uid: this.userId,
      id: uniqid(),
    });

    this.form.reset();
  }

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }

  public get modeLabel(): string {
    return `${this.trPath}${this.isIncomeMode ? 'income' : 'expense'}Name`;
  }
}
