import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createCalculation } from '../actions';
import CalculationForm from '../components/CalculationForm';

class CreateCalculation extends React.Component {
  state = { redirect_to: '' }

  render() {
    return (
      <div>
        {this.state.redirect_to !== '' && <Redirect to={this.state.redirect_to} />}
        <h1>Create new calculation</h1>
        <CalculationForm handleSubmit={this.props.createCalculation}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createCalculation: (calculation) => {
    dispatch(createCalculation(calculation))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCalculation)
