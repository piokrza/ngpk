import { CashFlow } from '@common/models/cash-flow.model';
import { createReducer, on } from '@ngrx/store';
import { IncomesActions } from '@store/incomes';

export const FeatureKey = 'incomes';

export interface State {
  incomes: CashFlow[];
  isLoading: boolean;
}

const initialState: State = {
  incomes: [],
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  // get incomes
  on(IncomesActions.getIncomes, (state) => {
    return { ...state, isLoading: true };
  }),
  on(IncomesActions.getIncomesSuccess, (_, { incomes }): State => {
    return { incomes, isLoading: false };
  }),
  on(IncomesActions.getIncomesFailure, (state: State): State => {
    return { ...state, isLoading: false };
  }),

  // add income
  on(IncomesActions.addIncome, (state, { income }) => {
    return { ...state, incomes: [...state.incomes, income] };
  })
);
