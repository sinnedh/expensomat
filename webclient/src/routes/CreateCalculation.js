import React from 'react';
import { Redirect } from 'react-router-dom';
import { createCalculation } from '../api';
import CalculationForm from '../components/CalculationForm';

class CreateCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: '',
      redirect_to: '',
    }
  }

  componentDidMount() {
  }

  createCalculation = (calculation) => {
    const onSuccess = response => {
      this.setState({redirect_to: 'calculation/' + response.members[0].token});
    }
    const onFailure = response => {
      this.setState({notification: 'Could not load calculation'});
    }

    createCalculation(calculation, onSuccess, onFailure);
  }

  render() {
    return (
      <div>
        {this.state.redirect_to !== '' && <Redirect to={this.state.redirect_to} />}
        <h1>Create new calculation</h1>
        {this.state.notification && <p>{this.state.notification}</p>}
        <CalculationForm handleSubmit={this.createCalculation}/>
      </div>
    );
  }
}

export default CreateCalculation;
