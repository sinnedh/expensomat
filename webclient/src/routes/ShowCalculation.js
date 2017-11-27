import React from 'react';
import { connect } from 'react-redux';
import { createExpense, getCalculation, getExpenses } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseMatrix from '../components/ExpenseMatrix';
import MembersList from '../components/MembersList';

class ShowCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notification: ''};
  }

  componentDidMount() {
    const token = this.props.match.params.token;
    this.props.dispatch(getCalculation(token));
    this.props.dispatch(getExpenses(token));
  }

  createExpense = (expense) => {
    const token = this.props.match.params.token;
    this.props.dispatch(createExpense(token, expense));
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.description}</p>
        {this.state.notification && <p>{this.state.notification}</p>}
        <h2>Members</h2>
        <MembersList members={this.props.members} />
        <h2>Matrix</h2>
        <ExpenseMatrix members={this.props.members} elements={this.props.matrix} />
        <h2>Expenses</h2>
        <ExpenseForm handleSubmit={this.createExpense} members={this.props.members} />
        <ExpenseList expenses={this.props.expenses} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expenses: state.expenses.items,
  name: state.calculations.name,
  description: state.calculations.description,
  members: state.calculations.members,
  matrix: state.calculations.matrix,
});

export default connect(mapStateToProps)(ShowCalculation);
