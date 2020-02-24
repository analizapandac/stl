import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Orders from './components/Orders';
import Order from './components/Order';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/orders/new" component={OrderForm} />
        <Route path="/orders/:orderId" component={Order} />
        <Route exact path="/" component={Orders} />
      </Switch>
    </Router>
  );
}

export default App;
