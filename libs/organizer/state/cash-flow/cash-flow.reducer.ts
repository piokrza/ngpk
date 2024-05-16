import { createReducer, on } from '@ngrx/store';

import { CashFlow } from '@ngpk/organizer/model';
import { AuthActions } from '@ngpk/organizer/state/auth';
import { CashFlowActions } from '@ngpk/organizer/state/cash-flow';

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
