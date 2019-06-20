import React from 'react';
import { Provider } from 'react-redux';

import Home from './container/Home';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
