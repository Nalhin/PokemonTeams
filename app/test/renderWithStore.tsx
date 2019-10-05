import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as React from 'react';

export const renderWithStore = (ui, reducer, initialState) => {
  const store = createStore(reducer, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),

    store,
  };
};
