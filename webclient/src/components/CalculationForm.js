import React from 'react';
import {getFormFieldValue} from '../utils';

class CalculationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      members: [{name: ""}],
    };

    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.handleMemberNameChange = this.handleMemberNameChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addMember(event) {
    event.preventDefault();
    this.setState({"members": [...this.state.members, {name: ""}]});
  }

  deleteMember(event, index) {
    event.preventDefault();

    let members = this.state.members;
    members.splice(index, 1)

    this.setState({members});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  handleInputChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: getFormFieldValue(event.target, name)
    });
  }

  handleMemberNameChange(event, index) {
    const value = event.target.value;

    let members = this.state.members;
    members[index] = {"name": value};

    this.setState({members});
  }

  render() {
    return (
      <form>
        <label>
          Name:
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <h2>Members</h2>
        {this.state.members.map((member, i) =>
          <p key={i}>
            <label key={i}>
              Name:
              <input
                name={"member" + i + "-name"}
                value={member.name}
                onChange={(e) => this.handleMemberNameChange(e, i)} />
            </label>
            <input
              type="button"
              value="Delete"
              onClick={(e) => this.deleteMember(e, i)} />
          </p>
        )}

        <input type="button" value="Add member" onClick={this.addMember} />

        <input type="button" value="Create calculation" onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default CalculationForm;
