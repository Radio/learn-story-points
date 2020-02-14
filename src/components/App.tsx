import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Animals from './Animals';
import Tasks from './Tasks';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/animals">
          <Animals />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/">
          <nav>
            <ul>
              <li>
                <Link to="/animals">Animals</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
