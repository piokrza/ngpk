import { ActionTypes } from '@store/cash-flow/action-types';
import { CashFlow } from '@common/models/cash-flow.model';
import { createAction, props } from '@ngrx/store';

// get incomes
export const getIncomes = createAction(ActionTypes.GET_INCOMES);
export const getIncomesSuccess = createAction(ActionTypes.GET_INCOMES_SUCCESS, props<{ incomes: CashFlow[] }>());
export const getIncomesFailure = createAction(ActionTypes.GET_INCOMES_FAILURE);

// add income
export const addIncome = createAction(ActionTypes.ADD_INCOME, props<{ income: CashFlow }>());

// get expenses
export const getExpenses = createAction(ActionTypes.GET_EXPENSES);
export const getExpensesSuccess = createAction(ActionTypes.GET_EXPENSES_SUCCESS, props<{ expenses: CashFlow[] }>());
export const getExpensesFailure = createAction(ActionTypes.GET_EXPENSES_FAILURE);
