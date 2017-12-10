import React from 'react'
import { connect } from 'react-redux'
import EditableInput from '../components/EditableInput'
import { updateCalculation, updateMember } from '../actions'

class ManageCalculation extends React.Component {
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
        <ul>
          {this.props.members.map((m, i) =>
            <li key={i}>
              <EditableInput
                value={m.name}
                onClickSave={value => this.props.onUpdateMemberName(this.props.members, m, value)}
                />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.application.token,
  name: state.calculations.name,
  description: state.calculations.description,
  members: state.calculations.members,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateName: (name) => {
    dispatch(updateCalculation(ownProps.token, {name}))
  },
  onUpdateDescription: (description) => {
    dispatch(updateCalculation(ownProps.token, {description}))
  },
  onUpdateMemberName: (members, member, name) => {
    dispatch(updateMember(ownProps.token, members, member, {name}))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
