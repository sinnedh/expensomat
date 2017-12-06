import React from 'react'
import { connect } from 'react-redux'
import MembersList from '../components/MembersList'
import { setToken } from '../actions'

class ManageCalculation extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount()
  }

  render() {
    return (
      <div>
        <h1>Manage calculation: {this.props.name}</h1>
        <span>{this.props.description}</span>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalculation)
