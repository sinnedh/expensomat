import React from 'react';
import {getFormFieldValue} from '../utils';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: 0,
      paid_at: new Date().toISOString(),
      paid_by: [],
      paid_for: [],
    };

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

  render() {
    return (
      <form>
      <label>
        Paid by:
        <select
          name="paid_by"
          multiple={true}
          onChange={this.handleInputChange}
          value={this.state.paid_by}>
          {Object.keys(this.props.members).map((id) =>
            <option key={id} value={id}>{this.props.members[id].name}</option>
          )}
        </select>
      </label>
      <br />
        <label>
          Paid for:
          <select
            name="paid_for"
            multiple={true}
            onChange={this.handleInputChange}
            value={this.state.paid_for}>
            {Object.keys(this.props.members).map((id) =>
              <option key={id} value={id}>{this.props.members[id].name}</option>
            )}
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input
            name="amount"
            value={this.state.amount}
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
          Paid at:
          <input
            name="paid_at"
            value={this.state.paid_at}
            onChange={this.handleInputChange} />
        </label>
        <input type="button" value="Add" onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default ExpenseForm;
