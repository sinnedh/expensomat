import React from 'react'
import { connect } from 'react-redux'
import MembersList from '../components/MembersList'
import EditableInput from '../components/EditableInput'
import { updateCalculation, setToken } from '../actions'

class ManageCalculation extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount()
  }

  render() {
    return (
      <div>
        <h1>Manage calculation:</h1>
        <div>
          <label>Name:</label>{' '}
          <EditableInput
            value={this.props.name}
            onClickSave={value => this.props.onUpdateName(value)}
            />
        </div>
        <div>
          <label>Description:</label>{' '}
          <EditableInput
            value={this.props.description}
            onClickSave={value => this.props.onUpdateDescription(value)}
            />
        </div>
        <h2>Members</h2>
        <MembersList members={this.props.members} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.calculations.name,
  description: state.calculations.description,
  members: state.calculations.members,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentDidMount: () => {
    const token = ownProps.match.params.token
    dispatch(setToken(token))
  },
  onUpdateName: (name) => {
    const token = ownProps.match.params.token
    dispatch(updateCalculation(token, {name}))
  },
  onUpdateDescription: (description) => {
    const token = ownProps.match.params.token
    dispatch(updateCalculation(token, {description}))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
