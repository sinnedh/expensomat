import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Calculation from './routes/Calculation'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/calculation/:id" component={Calculation} />
        </div>
      </Router>
    );
  }
}

export default App;
