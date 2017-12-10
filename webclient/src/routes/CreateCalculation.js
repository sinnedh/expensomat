import React from 'react';
import { Redirect } from 'react-router-dom';
import { createCalculation } from '../actions';
import CalculationForm from '../components/CalculationForm';

class CreateCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect_to: '',
    }
  }

  createCalculation = (calculation) => {
    this.props.dispatch(createCalculation(calculation));
  }

  render() {
    return (
      <div>
        {this.state.redirect_to !== '' && <Redirect to={this.state.redirect_to} />}
        <h1>Create new calculation</h1>
        <CalculationForm handleSubmit={this.createCalculation}/>
      </div>
    );
  }
}

export default CreateCalculation;
