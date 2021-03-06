import React from 'react';
import {getFormFieldValue} from '../utils';
import { roleOptions } from './MemberList'

class MemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({'name': ''})
    this.props.onSubmit(this.state);
  }

  handleInputChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: getFormFieldValue(event.target)
    });
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
        <label>
          Role:
          <select name="role" value={this.state.role} onChange={this.handleInputChange}>
            {Object.keys(roleOptions).map((key) =>
              <option key={key} value={key}>{roleOptions[key]}</option>
            )}
          </select>
        </label>
        <input type="button" value="Add" onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default MemberForm;
