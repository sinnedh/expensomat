import React from 'react'
import { connect } from 'react-redux'
import EditableInput from '../components/EditableInput'
import { updateExpense } from '../actions'

class EditExpense extends React.Component {
  render() {
    return (
      <div>
        <h1>Edit expense:</h1>
        <div>
          <label>Description:</label>{' '}
          <EditableInput
            value={this.props.description}
            onClickSave={value => this.props.onUpdateDescription(value)}
            />
        </div>
        <div>
          <label>Amount:</label>{' '}
          <EditableInput
            value={this.props.amount}
            onClickSave={value => this.props.onUpdateAmount(value)}
            />
        </div>
        <div>
          <label>Paid at:</label>{' '}
          <EditableInput
            value={this.props.paid_at}
            onClickSave={value => this.props.onUpdatePaidAt(value)}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const expenseId = parseInt(ownProps.match.params.id, 10)
  const expense = state.expenses.items.find(e => e.id === expenseId)

  return {
    token: state.application.token,
    description: expense.description,
    amount: expense.amount,
    paid_at: expense.paid_at,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const expenseId = parseInt(ownProps.match.params.id, 10)

  return {
    onUpdateDescription: (description) => {
      dispatch(updateExpense(ownProps.token, expenseId, {description}))
    },
    onUpdateAmount: (amount) => {
      dispatch(updateExpense(ownProps.token, expenseId, {amount}))
    },
    onUpdatePaidAt: (paid_at) => {
      dispatch(updateExpense(ownProps.token, expenseId, {paid_at}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)
