import { createAction, props } from '@ngrx/store';

import { CashFlow, CashFlowUserData } from '#cash-flow/models';
import { ActionTypes } from '#store/cash-flow/action-types';

export const getCashFlowUserData = createAction(ActionTypes.GET_CASH_FLOW_USER_DATA, props<{ uid: string }>());
export const getCashFlowUserDataSuccess = createAction(
  ActionTypes.GET_CASH_FLOW_USER_DATA_SUCCESS,
  props<{ cashFlowData: CashFlowUserData }>()
);
export const getCashFlowUserDataFailure = createAction(ActionTypes.GET_CASH_FLOW_USER_DATA_FAILURE);

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
