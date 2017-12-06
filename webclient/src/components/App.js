import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateCalculation from '../routes/CreateCalculation';
import ShowCalculation from '../routes/ShowCalculation';
import ManageCalculation from '../routes/ManageCalculation';
import LoadingIndicator from './LoadingIndicator';
import NotificationMessage from './NotificationMessage';
import Navigation from './Navigation';

export default (props) => (
  <Router>
    <div className="App">
      <Navigation token={props.token} />
      <LoadingIndicator isLoading={props.isLoading} />
      <NotificationMessage
        text={props.notificationText}
        type={props.notificationType}
      />
      <Route exact path="/calculation" component={CreateCalculation} />
      <Route exact path="/calculation/:token/manage" component={ManageCalculation} />
      <Route exact path="/calculation/:token" component={ShowCalculation} />
    </div>
  </Router>
)
