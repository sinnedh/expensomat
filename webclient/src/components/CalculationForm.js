import React from 'react';
import {getFormFieldValue} from '../utils';

class CalculationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      members: [{name: '', role: 'admin'}],
    };

    this.handleMemberNameChange = this.handleMemberNameChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: getFormFieldValue(event.target)
    });
  }

  handleMemberNameChange(event) {
    // Theoretically multiple members could be handled. Therefore the array.
    const name = getFormFieldValue(event.target);
    const members = [{...this.state.members[0], name}];
    this.setState({members});
  }

  render() {
    return (
      <form>
        <label>
          Calculation Name:
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

        <label>
          Your Name:
          <input
            name="member-name"
            value={this.state.members.name}
            onChange={this.handleMemberNameChange} />
        </label>
        <br />

        <input className="submit" type="button" value="Create calculation" onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default CalculationForm;
