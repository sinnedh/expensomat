import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShowCalculation from './routes/ShowCalculation';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/calculation/:token" component={ShowCalculation} />
        </div>
      </Router>
    );
  }
}

export default App;
