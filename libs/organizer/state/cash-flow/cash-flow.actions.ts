import { createAction, props } from '@ngrx/store';

import { CashFlow } from '@ngpk/organizer/model';
import { ActionTypes } from '@ngpk/organizer/state/cash-flow/action-types';

export const loadCashFlow = createAction(ActionTypes.LOAD_CASHFLOW, props<{ uid: string }>());
export const loadCashFlowSuccess = createAction(ActionTypes.LOAD_CASHFLOW_SUCCESS, props<{ cashFlow: CashFlow[] }>());
export const loadCashFlowFailure = createAction(ActionTypes.LOAD_CASHFLOW_FAILURE);

export const addCashFlow = createAction(ActionTypes.ADD_CASHFLOW, props<{ cashFlow: CashFlow }>());
export const addCashFlowSuccess = createAction(ActionTypes.ADD_CASHFLOW_SUCCESS);
export const addCashFlowFailure = createAction(ActionTypes.ADD_CASHFLOW_FAILURE);

export const deleteCashFlow = createAction(ActionTypes.DELETE_CASHFLOW, props<{ id: string }>());
export const deleteCashFlowSuccess = createAction(ActionTypes.DELETE_CASHFLOW_SUCCESS);
export const deleteCashFlowFailure = createAction(ActionTypes.DELETE_CASHFLOW_FAILURE);

export const updateCashFlow = createAction(ActionTypes.UPDATE_CASHFLOW, props<{ cashFlow: CashFlow }>());
export const updateCashFlowSuccess = createAction(ActionTypes.UPDATE_CASHFLOW_SUCCESS);
export const updateCashFlowFailure = createAction(ActionTypes.UPDATE_CASHFLOW_FAILURE);
