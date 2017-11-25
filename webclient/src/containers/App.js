import { connect } from 'react-redux';
import App from '../components/App';
import { resetNotification, setErrorNotification } from '../actions';
import './App.css';

const mapStateToProps = (state, ownProps) => ({
  notificationMessage: state.notifications.message,
  notificationType: state.notifications.type,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
