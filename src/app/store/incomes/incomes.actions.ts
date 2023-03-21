import { CashFlow } from '@common/models/cash-flow.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/incomes/action-types';

// get incomes
export const getIncomes = createAction(ActionTypes.GET_INCOMES);
export const getIncomesSuccess = createAction(ActionTypes.GET_INCOMES_SUCCESS, props<{ incomes: CashFlow[] }>());
export const getIncomesFailure = createAction(ActionTypes.GET_INCOMES_FAILURE);

// add income
export const addIncome = createAction(ActionTypes.ADD_INCOME, props<{ income: CashFlow }>());
