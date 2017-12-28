import { connect } from 'react-redux';
import App from '../components/App';
import './App.css';

const mapStateToProps = (state, ownProps) => ({
  token: state.getIn(['application', 'token']),
  user: state.getIn(['application', 'user']).toJSON(),
  notificationText: state.getIn(['application', 'notificationText']),
  notificationType: state.getIn(['application', 'notificationType']),
  isLoading: state.getIn(['application', 'loadingCounter']) > 0,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
