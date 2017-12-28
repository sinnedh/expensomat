import React from 'react'
import { connect } from 'react-redux'
import { EditableInput } from '../components/EditableField'
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
  const expense = state.getIn(['expenses', ownProps.match.params.id.toString()])
  return {
    token: state.getIn(['application', 'token']),
    description: expense ? expense.get('description') : '',
    amount: expense ? expense.get('amount') : 0,
    paid_at: expense ? expense.get('paid_at') : '',
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const expenseId = parseInt(ownProps.match.params.id, 10)
  const token = ownProps.match.params.token

  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)
