import React from 'react';
import { createExpense, getCalculation, getExpensesForCalculation } from '../api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import MembersList from '../components/MembersList';

class Calculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      members: [],
      expenses: [],
      notification: '',
    };
  }

  componentDidMount() {
    const calculationId = this.props.match.params.id;
    {
      const onSuccess = response => this.setState({
        name: response.name,
        description: response.description,
        members: response.members,
      });
      const onFailure = response => {
        this.setState({notification: 'Could not load calculation'});
      }
      getCalculation(calculationId, onSuccess, onFailure);
    }

    {
      const onSuccess = expenses => this.setState({ expenses });
      const onFailure = response => {
        this.setState({notification: 'Could not load expenses'});
      }
      getExpensesForCalculation(calculationId, onSuccess, onFailure);
    }

  }

  createExpense = (expense) => {
    const calculationId = this.props.match.params.id;
    const onSuccess = response => {
      this.setState({notification: 'Succesfully created expense'});
    }
    const onFailure = response => {
      this.setState({notification: 'Could not create expense'});
    }
    createExpense(calculationId, expense, onSuccess, onFailure);
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        {this.state.notification && <p>{this.state.notification}</p>}
        <h2>Members</h2>
        <MembersList members={this.state.members} />
        <h2>Expenses</h2>
        <ExpenseForm calculationId={this.props.match.params.id} handleSubmit={this.createExpense} members={this.state.members} />
        <ExpenseList expenses={this.state.expenses} />
      </div>
    );
  }
}

export default Calculation;
