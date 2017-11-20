import React from 'react';
import { createExpense, getCalculation, getExpensesForCalculation } from '../api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseMatrix from '../components/ExpenseMatrix';
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
      matrix: {},
    };
  }

  componentDidMount() {
    const token = this.props.match.params.token;
    {
      const onSuccess = response => this.setState({
        name: response.name,
        description: response.description,
        members: response.members,
        matrix: response.matrix,
      });
      const onFailure = response => {
        this.setState({notification: 'Could not load calculation'});
      }
      getCalculation(token, onSuccess, onFailure);
    }

    {
      const onSuccess = expenses => this.setState({ expenses });
      const onFailure = response => {
        this.setState({notification: 'Could not load expenses'});
      }
      getExpensesForCalculation(token, onSuccess, onFailure);
    }

  }

  createExpense = (expense) => {
    const token = this.props.match.params.token;
    const onSuccess = response => {
      this.setState({
        notification: 'Succesfully created expense',
        expenses: [response, ...this.state.expenses], // TODO: sort by date
      });

    }
    const onFailure = response => {
      this.setState({notification: 'Could not create expense'});
    }
    createExpense(token, expense, onSuccess, onFailure);
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        {this.state.notification && <p>{this.state.notification}</p>}
        <h2>Members</h2>
        <MembersList members={this.state.members} />
        <h2>Matrix</h2>
        <ExpenseMatrix members={this.state.members} elements={this.state.matrix} />
        <h2>Expenses</h2>
        <ExpenseForm handleSubmit={this.createExpense} members={this.state.members} />
        <ExpenseList expenses={this.state.expenses} />
      </div>
    );
  }
}

export default Calculation;
