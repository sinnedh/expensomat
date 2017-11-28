import { connect } from 'react-redux';
import App from '../components/App';
import './App.css';

const mapStateToProps = (state, ownProps) => ({
  notificationMessage: state.notifications.message,
  notificationType: state.notifications.type,
  isLoading: state.application.loadingCounter > 0,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
