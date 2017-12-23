import React from 'react'
import { connect } from 'react-redux'
import EditableInput from '../components/EditableInput'
import { deleteMember, updateCalculation, updateMember } from '../actions'
import MemberList from '../components/MemberList'

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
        <MemberList
          members={this.props.members}
          onClickDelete={this.props.onClickDeleteMember}
          onUpdateName={this.props.onUpdateMemberName}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.getIn(['application', 'token']),
  name: state.getIn(['calculations', 'name']),
  description: state.getIn(['calculations', 'description']),
  members: state.getIn(['members']).toJS(),
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const token = ownProps.match.params.token

  return {
    onUpdateName: (name) => {
      dispatch(updateCalculation(token, {name}))
    },
    onUpdateDescription: (description) => {
      dispatch(updateCalculation(token, {description}))
    },
    onUpdateMemberName: (id, name) => {
      dispatch(updateMember(token, id, {name}))
    },
    onClickDeleteMember: (event, memberId) => {
      event.preventDefault();
      dispatch(deleteMember(token, memberId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
