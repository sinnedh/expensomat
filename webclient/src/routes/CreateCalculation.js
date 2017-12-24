import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createCalculation } from '../actions';
import CalculationForm from '../components/CalculationForm';

class CreateCalculation extends React.Component {

  render() {
    return (
      <div>
        {this.props.redirect_to !== '' && <Redirect to={this.props.redirect_to} />}
        <h1>Create new calculation</h1>
        <CalculationForm handleSubmit={this.props.createCalculation}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const token = state.getIn(['application', 'token'])
  return {
    redirect_to: token ? `/calculation/${token}/manage` : ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createCalculation: (calculation) => {
    dispatch(createCalculation(calculation))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCalculation)
