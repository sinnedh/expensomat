import React from 'react';
import { connect } from 'react-redux';
import { createExpense, deleteExpense } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseMatrix from '../components/ExpenseMatrix';

class ShowCalculation extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.description}</p>
        <h2>Matrix</h2>
        <ExpenseMatrix members={this.props.members} elements={this.props.matrix} />
        <h2>Expenses</h2>
        <ExpenseForm handleSubmit={this.props.onSubmitExpenseForm} members={this.props.members} />
        <ExpenseList onClickDelete={this.props.onClickDelete} expenses={this.props.expenses} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.application.token,
  expenses: state.expenses.items,
  name: state.calculations.name,
  description: state.calculations.description,
  members: state.calculations.members,
  matrix: state.calculations.matrix,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmitExpenseForm: (expense) => {
    dispatch(createExpense(ownProps.token, expense));
  },
  onClickDelete: (event, expense) => {
    event.preventDefault();
    dispatch(deleteExpense(ownProps.token, expense));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowCalculation);
