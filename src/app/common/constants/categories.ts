import { Categories } from '@common/models/category.model';

export const MockedCategories: Categories = {
  expenses: [
    {
      name: 'Food and Dring',
      code: '0',
    },
    {
      name: 'Entertainment',
      code: '1',
    },
    {
      name: 'Travel',
      code: '2',
    },
  ],
  incomes: [
    {
      name: 'Salary',
      code: '3',
    },
    {
      name: 'Other',
      code: '4',
    },
  ],
};
