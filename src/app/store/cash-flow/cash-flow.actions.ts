import { createAction, props } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { ActionTypes } from '#store/cash-flow/action-types';

export const getExpenses = createAction(ActionTypes.GET_EXPENSES, props<{ uid: string }>());
export const getExpensesSuccess = createAction(ActionTypes.GET_EXPENSES_SUCCESS, props<{ expenses: CashFlow[] }>());
export const getExpensesFailure = createAction(ActionTypes.GET_EXPENSES_FAILURE);

export const getIncomes = createAction(ActionTypes.GET_INCOMES, props<{ uid: string }>());
export const getIncomesSuccess = createAction(ActionTypes.GET_INCOMES_SUCCESS, props<{ incomes: CashFlow[] }>());
export const getIncomesFailure = createAction(ActionTypes.GET_INCOMES_FAILURE);

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
