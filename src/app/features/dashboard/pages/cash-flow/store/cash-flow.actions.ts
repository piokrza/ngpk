import { createAction, props } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { ActionTypes } from '#cash-flow/store/action-types';

export const loadExpenses = createAction(ActionTypes.LOAD_EXPENSES, props<{ uid: string }>());
export const loadExpensesSuccess = createAction(ActionTypes.LOAD_EXPENSES_SUCCESS, props<{ expenses: CashFlow[] }>());
export const loadExpensesFailure = createAction(ActionTypes.LOAD_EXPENSES_FAILURE);

export const loadIncomes = createAction(ActionTypes.LOAD_INCOMES, props<{ uid: string }>());
export const loadIncomesSuccess = createAction(ActionTypes.LOAD_INCOMES_SUCCESS, props<{ incomes: CashFlow[] }>());
export const loadIncomesFailure = createAction(ActionTypes.LOAD_INCOMES_FAILURE);

export const addIncome = createAction(ActionTypes.ADD_INCOME, props<{ income: CashFlow }>());
export const addIncomeSuccess = createAction(ActionTypes.ADD_INCOME_SUCCESS);
export const addIncomeFailure = createAction(ActionTypes.ADD_INCOME_FAILURE);

export const removeIncome = createAction(ActionTypes.REMOVE_INCOME, props<{ incomeId: string }>());
export const removeIncomeSuccess = createAction(ActionTypes.REMOVE_INCOME_SUCCESS);
export const removeIncomeFailure = createAction(ActionTypes.REMOVE_INCOME_FAILURE);

export const updateIncome = createAction(ActionTypes.UPDATE_INCOME, props<{ updatedIncome: CashFlow }>());
export const updateIncomeSuccess = createAction(ActionTypes.UPDATE_INCOME_SUCCESS);
export const updateIncomeFailure = createAction(ActionTypes.UPDATE_INCOME_FAILURE);

export const addExpense = createAction(ActionTypes.ADD_EXPENSE, props<{ expense: CashFlow }>());
export const addExpenseSuccess = createAction(ActionTypes.ADD_EXPENSE_SUCCESS);
export const addExpenseFailure = createAction(ActionTypes.ADD_EXPENSE_FAILURE);

export const removeExpense = createAction(ActionTypes.REMOVE_EXPENSE, props<{ expenseId: string }>());
export const removeExpenseSuccess = createAction(ActionTypes.REMOVE_EXPENSE_SUCCESS);
export const removeExpenseFailure = createAction(ActionTypes.REMOVE_EXPENSE_FAILURE);

export const updateExpense = createAction(ActionTypes.UPDATE_EXPENSE, props<{ updatedExpense: CashFlow }>());
export const updateExpenseSuccess = createAction(ActionTypes.UPDATE_EXPENSE_SUCCESS);
export const updateExpenseFailure = createAction(ActionTypes.UPDATE_EXPENSE_FAILURE);

export const setIncomesFilter = createAction(ActionTypes.SET_INCOMES_FILTER, props<{ categoryIds: string[] }>());
export const setExpensesFilter = createAction(ActionTypes.SET_EXPENSES_FILTER, props<{ categoryIds: string[] }>());
