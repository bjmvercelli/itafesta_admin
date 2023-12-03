import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import DataTablePage from './pages/DataTablePage';
import LoginPage from './pages/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route key="login" exact path="/login" component={LoginPage} />
          <Route key="index" exact path="/dashboard" component={DashboardPage} />
          <Route key="table" path="/fornecedores" component={DataTablePage} />
          <Redirect to="/login" />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
