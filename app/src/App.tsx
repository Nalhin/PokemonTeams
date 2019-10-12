import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/styles';

import store from './store/store';
import View from './routes/View';

const App = () => {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <CssBaseline />
          <View />
        </BrowserRouter>
      </StylesProvider>
    </Provider>
  );
};

export default App;
