import { connect } from 'react-redux';
import App from '../components/App';
import './App.css';

const mapStateToProps = (state, ownProps) => ({
  notificationText: state.application.notificationText,
  notificationType: state.application.notificationType,
  isLoading: state.application.loadingCounter > 0,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
