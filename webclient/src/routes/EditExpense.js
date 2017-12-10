import React from 'react'
import { connect } from 'react-redux'
import EditableInput from '../components/EditableInput'
import { updateExpense, setToken } from '../actions'

class EditExpense extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount()
  }

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
    description: expense.description,
    amount: expense.amount,
    paid_at: expense.paid_at,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const token = ownProps.match.params.token
  const expenseId = parseInt(ownProps.match.params.id, 10)

  return {
    onComponentDidMount: () => {
      dispatch(setToken(token))
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

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)
