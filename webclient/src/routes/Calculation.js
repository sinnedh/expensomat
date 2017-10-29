import React from 'react';
import { createExpense, getCalculation, getExpensesForCalculation } from '../api';
import ExpenseList from '../components/ExpenseList';
import MembersList from '../components/MembersList';

class Calculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '', members: [], expenses: [] };
  }

  componentDidMount() {
    const calculation_id = this.props.match.params.id;
    getCalculation(calculation_id, calculation => this.setState({
      name: calculation.name,
      description: calculation.description,
      members: calculation.members,
    }));
    getExpensesForCalculation(calculation_id, expenses => this.setState({ expenses }));
  createExpense = (expense) => {
    const calculationId = this.props.match.params.id;
    const onSuccess = response => {
      this.setState({notification: 'Succesfully created expense'});
    }
    createExpense(calculationId, expense, onSuccess);
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <h2>Members</h2>
        <MembersList members={this.state.members} />
        <h2>Expenses</h2>
        <ExpenseList expenses={this.state.expenses} />
      </div>
    );
  }
}

export default Calculation;
