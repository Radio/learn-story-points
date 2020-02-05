import React from 'react';
import Animals from './Animals';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/animals">
          <Animals />
        </Route>
        <Route path="/">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/animals">Animals</Link>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
