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
  token: state.getIn(['application', 'token']),
  expenses: state.get('expenses').toJS(),
  name: state.getIn(['calculations', 'name']),
  description: state.getIn(['calculations', 'description']),
  members: state.getIn(['calculations', 'members']).toJS(),
  matrix: state.getIn(['calculations', 'matrix']).toJS(),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const token = ownProps.match.params.token

  return {
    onSubmitExpenseForm: (expense) => {
      dispatch(createExpense(token, expense));
    },
    onClickDelete: (event, expense) => {
      event.preventDefault();
      dispatch(deleteExpense(token, expense.id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCalculation);
