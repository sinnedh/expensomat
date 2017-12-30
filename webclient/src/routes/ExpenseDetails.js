import React from 'react'
import { connect } from 'react-redux'
import { EditableInput } from '../components/EditableField'
import { deleteExpense, updateExpense } from '../actions'

class ExpenseDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>Expense details:</h1>
        <div>
          <label>Description:</label>{' '}
          <EditableInput
            isEditable={this.props.canEditExpenses}
            value={this.props.description}
            onClickSave={value => this.props.onUpdateDescription(value)}
            />
        </div>
        <div>
          <label>Amount:</label>{' '}
          <EditableInput
            isEditable={this.props.canEditExpenses}
            value={this.props.amount}
            onClickSave={value => this.props.onUpdateAmount(value)}
            />
        </div>
        <div>
          <label>Paid at:</label>{' '}
          <EditableInput
            isEditable={this.props.canEditExpenses}
            value={this.props.paid_at}
            onClickSave={value => this.props.onUpdatePaidAt(value)}
            />
        </div>
        {this.props.canEditExpenses && this.props.expenseId != null && 
          <button onClick={(e) => this.props.onClickDelete(e, this.props.expenseId)}>
            Delete
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const expense = state.getIn(['expenses', ownProps.match.params.id.toString()])
  return {
    canEditExpenses: state.getIn(['application', 'user', 'canEditExpenses']),
    token: state.getIn(['application', 'token']),
    expenseId: expense ? expense.get('id') : null,
    description: expense ? expense.get('description') : '',
    amount: expense ? expense.get('amount') : 0,
    paid_at: expense ? expense.get('paid_at') : '',
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const expenseId = parseInt(ownProps.match.params.id, 10)
  const token = ownProps.match.params.token

  return {
    onClickDelete: (event, expenseId) => {
      event.preventDefault();
      dispatch(deleteExpense(token, expenseId));
    },
    onUpdateDescription: (description) => {
      dispatch(updateExpense(token, expenseId, {description}))
    },
    onUpdateAmount: (amount) => {
      dispatch(updateExpense(token, expenseId, {amount}))
    },
    onUpdatePaidAt: (paid_at) => {
      dispatch(updateExpense(token, expenseId, {paid_at}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetails)
