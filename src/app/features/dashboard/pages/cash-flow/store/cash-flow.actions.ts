import { createAction, props } from '@ngrx/store';

import { CashFlow } from '#cash-flow/models';
import { ActionTypes } from '#cash-flow/store/action-types';

export const loadCashFlow = createAction(ActionTypes.LOAD_CASHFLOW, props<{ uid: string }>());
export const loadCashFlowSuccess = createAction(ActionTypes.LOAD_CASHFLOW_SUCCESS, props<{ cashFlow: CashFlow[] }>());
export const loadCashFlowFailure = createAction(ActionTypes.LOAD_CASHFLOW_FAILURE);

export const addCashFlow = createAction(ActionTypes.ADD_CASHFLOW, props<{ cashFlow: CashFlow }>());
export const addCashFlowSuccess = createAction(ActionTypes.ADD_CASHFLOW_SUCCESS);
export const addCashFlowFailure = createAction(ActionTypes.ADD_CASHFLOW_FAILURE);

export const removeCashFlow = createAction(ActionTypes.REMOVE_CASHFLOW, props<{ id: string }>());
export const removeCashFlowSuccess = createAction(ActionTypes.REMOVE_CASHFLOW_SUCCESS);
export const removeCashFlowFailure = createAction(ActionTypes.REMOVE_CASHFLOW_FAILURE);

export const updateCashFlow = createAction(ActionTypes.UPDATE_CASHFLOW, props<{ cashFlow: CashFlow }>());
export const updateCashFlowSuccess = createAction(ActionTypes.UPDATE_CASHFLOW_SUCCESS);
export const updateCashFlowFailure = createAction(ActionTypes.UPDATE_CASHFLOW_FAILURE);

export const setIncomesFilter = createAction(ActionTypes.SET_INCOMES_FILTER, props<{ categoryIds: string[] }>());
export const setExpensesFilter = createAction(ActionTypes.SET_EXPENSES_FILTER, props<{ categoryIds: string[] }>());
