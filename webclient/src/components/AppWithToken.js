import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ShowCalculation from '../routes/ShowCalculation';
import EditExpense from '../routes/EditExpense';
import ManageCalculation from '../routes/ManageCalculation';

class AppWithToken extends React.Component {
  getChildContext() {
    return {token: this.props.token};
  }

  componentDidMount() {
    this.props.onComponentDidMount()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/calculation/:token/expense/:id" component={EditExpense} />
        <Route exact path="/calculation/:token/manage" component={ManageCalculation} />
        <Route exact path="/calculation/:token" component={ShowCalculation} />
      </Switch>
    )
  }
}

AppWithToken.childContextTypes = {
  token: PropTypes.string
}

export default AppWithToken
