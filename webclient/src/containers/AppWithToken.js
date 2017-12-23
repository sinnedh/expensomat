import { connect } from 'react-redux';
import { getCalculation, getExpenses, getMembers, setToken } from '../actions'
import AppWithToken from '../components/AppWithToken';

const mapStateToProps = (state, ownProps) => ({
  token: state.getIn(['application', 'token']),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentDidMount: () => {
    const token = ownProps.match.params.token;
    dispatch(setToken(token));
    dispatch(getCalculation(token));
    dispatch(getExpenses(token));
    dispatch(getMembers(token));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithToken);
