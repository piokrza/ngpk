import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { CATEGORIES } from '@common/enums/categories.enum';
import { Categories, Category } from '@common/models/category.model';
import { User } from '@common/models/user.model';
import { CashFlowFormService } from '@dashboard/services/cash-flow-form.service';
import { CashFlowForm } from '@features/cash-flow/models/cash-flow-form.model';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { Store } from '@ngrx/store';
import { CategoriesSelectors } from '@store/categories';
import { filter, map, Observable, take } from 'rxjs';

@Component({
  selector: 'ctrl-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowFormComponent implements OnInit {
  @Input() public isIncomeMode!: boolean;

  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  private readonly store: Store = inject(Store);
  private readonly authService: AuthService = inject(AuthService);
  public form: FormGroup<CashFlowForm> = inject(CashFlowFormService).createCashFlowForm();

  public readonly categories$: Observable<Category[]> = this.getCategories$();
  private userId!: string;

  public ngOnInit(): void {
    this.authService.authState$
      .pipe(
        take(1),
        filter(Boolean),
        map((user: User): string => user?.uid)
      )
      .subscribe({
        next: (userId: string): void => {
          this.userId = userId;
        },
      });
  }

  private getCategories$(): Observable<Category[]> {
    return this.store.select(CategoriesSelectors.categories).pipe(
      filter(Boolean),
      map((categories: Categories): Category[] => {
        const categoriesType: CATEGORIES = this.isIncomeMode ? CATEGORIES.INCOMES : CATEGORIES.EXPENSES;
        return categories[categoriesType];
      })
    );
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newCashFlow: CashFlow = {
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      uid: this.userId,
    };

    this.cashFlowSubmitData.emit(newCashFlow);
    this.form.reset();
  }
}
