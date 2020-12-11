import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Login from './modules/login';
import Messenger from './modules/messenger';
import PrivateRoute from './PrivateRoute';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route
        path='/'
        component={Login}
        exact
      />
      <PrivateRoute exact path='/messenger' component={Messenger}/>
    </BrowserRouter>
  );
}

export default App;
