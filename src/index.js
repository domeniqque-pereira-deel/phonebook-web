import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase from './services/firebase';

import 'firebase/analytics';

Firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));
