import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={OrderPizza} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
};

export default App;