import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { LandingPage } from './components/pages/Landing';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { ChooseUser } from './components/pages/ChooseUser';
import { ParentDashboard } from './components/pages/ParentDashboard';
import { ChildDashboard } from './components/pages/ChildDashboard';
import { MissionDashboard } from './components/pages/MissionDashboard';
import { WritingSubmit } from './components/pages/WritingSubmit';
import { DrawingSubmit } from './components/pages/DrawingSubmit';
import { ParentSettings } from './components/pages/ParentSettings';

import combineReducers from './state/reducers';

const store = createStore(combineReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/landing" component={LandingPage} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => <ChooseUser LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/example-list" component={ExampleListPage} />
        <SecureRoute path="/profile-list" component={ProfileListPage} />
        <SecureRoute path="/datavis" component={ExampleDataViz} />
        <SecureRoute path="/parent-dashboard" component={ParentDashboard} />
        <SecureRoute path="/parent-settings" component={ParentSettings} />
        <SecureRoute path="/child-dashboard" component={ChildDashboard} />
        <SecureRoute path="/mission-dashboard" component={MissionDashboard} />
        <SecureRoute path="/writing-submit" component={WritingSubmit} />
        <SecureRoute path="/drawing-submit" component={DrawingSubmit} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
