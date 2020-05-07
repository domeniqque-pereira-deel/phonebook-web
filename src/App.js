import React from 'react';
import { Router } from 'react-router-dom';
import Routes from '~/routes';

import history from '~/services/history';
import DefaultLayout from '~/pages/_layouts/Default/index';

// import '~/styles/global.css';

function App() {
  return (
    <Router history={history}>
      <DefaultLayout>
        <Routes />
      </DefaultLayout>
    </Router>
  );
}

export default App;
