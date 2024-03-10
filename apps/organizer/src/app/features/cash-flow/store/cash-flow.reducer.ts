import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '@ngpk/auth-organizer/state';

import { CashFlow } from '#cash-flow/models';
import { CashFlowActions } from '#cash-flow/store';

export const FeatureKey = 'cashflow';

export interface State {
  cashFlow: CashFlow[];
  isLoading: boolean;
}

const initialState: State = {
  cashFlow: [],
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  on(CashFlowActions.loadCashFlow, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.loadCashFlowSuccess, (state, { cashFlow }): State => {
    return { ...state, cashFlow, isLoading: false };
  }),
  on(CashFlowActions.loadCashFlowFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(AuthActions.signOut, (): State => {
    return { cashFlow: [], isLoading: false };
  })
);
