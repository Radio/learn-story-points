import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Animals from './Animals';
import Tasks from './Tasks';
import styled from 'styled-components';

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
            <Navigation>
              <li>
                <Link to="/animals" style={{ color: '#f06fff' }}>
                  Animals
                </Link>
              </li>
              <li>
                <Link to="/tasks" style={{ color: '#6f9aff' }}>
                  Tasks
                </Link>
              </li>
            </Navigation>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

const Navigation = styled.ul`
  padding: 200px 0 0 0;
  display: flex;
  justify-content: center;

  & > li {
    margin: 0 10px;
    background: #eee;
    list-style-type: none;

    & > a {
      display: block;
      padding: 30px;
    }
  }
`;
