import { CashFlow } from '@common/models/cash-flow.model';
import { createReducer, on } from '@ngrx/store';
import { CashFlowActions } from '@store/cash-flow';

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
  on(CashFlowActions.getIncomes, (state) => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getIncomesSuccess, (_, { incomes }): State => {
    return { incomes, isLoading: false };
  }),
  on(CashFlowActions.getIncomesFailure, (state: State): State => {
    return { ...state, isLoading: false };
  }),

  // add income
  on(CashFlowActions.addIncome, (state, { income }) => {
    return { ...state, incomes: [...state.incomes, income] };
  })
);
