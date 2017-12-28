import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateCalculation from '../routes/CreateCalculation';
import LoadingIndicator from './LoadingIndicator';
import NotificationMessage from './NotificationMessage';
import Navigation from './Navigation';
import AppWithToken from '../containers/AppWithToken';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation token={this.props.token} user={this.props.user}/>
          <LoadingIndicator isLoading={this.props.isLoading} />
          <NotificationMessage
            text={this.props.notificationText}
            type={this.props.notificationType}
          />
          <Route exact path="/calculation" component={CreateCalculation} />
          <Route path="/calculation/:token" component={AppWithToken} />
        </div>
      </Router>
    )
  }
}

export default App
