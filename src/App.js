import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';

import '~config/ReactotronConfig';

import Routes from '~routes';
import history from '~services/history';
import { store, persistor } from '~store';

import '~styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

const engine = new Styletron();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
              <Router history={history}>
                <Routes />
              </Router>
            </BaseProvider>
          </StyletronProvider>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
