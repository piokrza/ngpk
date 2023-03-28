import { CashFlowUserData } from '@features/cash-flow/models/cash-flow-user-data.model';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/cash-flow/action-types';

// get cash flow user data
export const getCashFlowUserData = createAction(ActionTypes.GET_CASH_FLOW_USER_DATA, props<{ uid: string }>());
export const getCashFlowUserDataSuccess = createAction(
  ActionTypes.GET_CASH_FLOW_USER_DATA_SUCCESS,
  props<{ cashFlowData: CashFlowUserData }>()
);
export const getCashFlowUserDataFailure = createAction(ActionTypes.GET_CASH_FLOW_USER_DATA_FAILURE);

// add income
export const addIncome = createAction(ActionTypes.ADD_INCOME, props<{ income: CashFlow }>());
export const addIncomeSuccess = createAction(ActionTypes.ADD_INCOME_SUCCESS);
export const addIncomeFailure = createAction(ActionTypes.ADD_INCOME_FAILURE);

// remove income
export const removeIncome = createAction(ActionTypes.REMOVE_INCOME, props<{ incomeId: string }>());
export const removeIncomeSuccess = createAction(ActionTypes.REMOVE_INCOME_SUCCESS);
export const removeIncomeFailure = createAction(ActionTypes.REMOVE_INCOME_FAILURE);

// add expense
export const addExpense = createAction(ActionTypes.ADD_EXPENSE, props<{ expense: CashFlow }>());
export const addExpenseSuccess = createAction(ActionTypes.ADD_EXPENSE);
export const addExpenseFailure = createAction(ActionTypes.ADD_EXPENSE);

// remove expense
export const removeExpense = createAction(ActionTypes.REMOVE_EXPENSE, props<{ expenseId: string }>());
export const removeExpenseSuccess = createAction(ActionTypes.REMOVE_EXPENSE_SUCCESS);
export const removeExpenseFailure = createAction(ActionTypes.REMOVE_EXPENSE_FAILURE);
