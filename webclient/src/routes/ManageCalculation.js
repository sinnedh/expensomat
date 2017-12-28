import React from 'react'
import { connect } from 'react-redux'
import { EditableInput } from '../components/EditableField'
import MemberList from '../components/MemberList'
import MemberForm from '../components/MemberForm'
import { createMember, deleteMember, updateCalculation, updateMember } from '../actions'

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
        <MemberForm
          onSubmit={this.props.onClickCreateMember}
          />
        <MemberList
          members={this.props.members}
          onClickDelete={this.props.onClickDeleteMember}
          onUpdateName={this.props.onUpdateMemberName}
          onUpdateRole={this.props.onUpdateMemberRole}
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
    onUpdateMemberRole: (id, role) => {
      dispatch(updateMember(token, id, {role}))
    },
    onClickDeleteMember: (event, memberId) => {
      event.preventDefault();
      dispatch(deleteMember(token, memberId));
    },
    onClickCreateMember: (member) => {
      dispatch(createMember(token, member));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
