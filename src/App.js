import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import '~config/ReactotronConfig';

import Routes from '~routes';
import history from '~services/history';
import { store, persistor } from '~store';

import '~styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
