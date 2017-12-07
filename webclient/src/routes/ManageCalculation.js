import React from 'react'
import { connect } from 'react-redux'
import EditableInput from '../components/EditableInput'
import { updateCalculation, updateMember, setToken } from '../actions'

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
        <ul>
          {this.props.members.map((m, i) =>
            <li>
              <EditableInput
                key={i}
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
  name: state.calculations.name,
  description: state.calculations.description,
  members: state.calculations.members,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentDidMount: () => {
    dispatch(setToken(ownProps.match.params.token))
  },
  onUpdateName: (name) => {
    dispatch(updateCalculation(ownProps.match.params.token, {name}))
  },
  onUpdateDescription: (description) => {
    dispatch(updateCalculation(ownProps.match.params.token, {description}))
  },
  onUpdateMemberName: (members, member, name) => {
    dispatch(updateMember(ownProps.match.params.token, members, member, {name}))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
