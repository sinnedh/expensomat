import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ShowCalculation from '../routes/ShowCalculation';
import ExpenseDetails from '../routes/ExpenseDetails';
import ManageCalculation from '../routes/ManageCalculation';

class AppWithToken extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/calculation/:token/expense/:id" component={ExpenseDetails} />
        <Route exact path="/calculation/:token/manage" component={ManageCalculation} />
        <Route exact path="/calculation/:token" component={ShowCalculation} />
      </Switch>
    )
  }
}

export default AppWithToken
