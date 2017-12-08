import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateCalculation from '../routes/CreateCalculation';
import ShowCalculation from '../routes/ShowCalculation';
import ManageCalculation from '../routes/ManageCalculation';
import LoadingIndicator from './LoadingIndicator';
import NotificationMessage from './NotificationMessage';
import Navigation from './Navigation';

class App extends React.Component {
  getChildContext() {
    return {token: this.props.token};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navigation token={this.props.token} />
          <LoadingIndicator isLoading={this.props.isLoading} />
          <NotificationMessage
            text={this.props.notificationText}
            type={this.props.notificationType}
          />
          <Route exact path="/calculation" component={CreateCalculation} />
          <Route exact path="/calculation/:token/manage" component={ManageCalculation} />
          <Route exact path="/calculation/:token" component={ShowCalculation} />
        </div>
      </Router>
    )
  }
}

App.childContextTypes = {
  token: PropTypes.string
}

export default App
