import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateCalculation from '../routes/CreateCalculation';
import ShowCalculation from '../routes/ShowCalculation';

export default (props) => (
  <Router>
    <div className="App">
      {props.notificationMessage && <p>{props.notificationType}: {props.notificationMessage}</p>}
      <Route exact path="/calculation" component={CreateCalculation} />
      <Route path="/calculation/:token" component={ShowCalculation} />
    </div>
  </Router>
)
