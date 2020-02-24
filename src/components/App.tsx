import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Animals from './Animals';
import Tasks from './Tasks';
import styled from 'styled-components';
import Admin from './Admin';
import { connect, Connection } from '../infrastructure/ws';

const App = () => {
  const [connection, setConnection] = useState<Connection | undefined>();
  const [page, setPage] = useState('index');

  useEffect(() => {
    const connection = connect();
    connection.addListener('page', setPage);
    setConnection(connection);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/animals">{connection && <Animals connection={connection} />}</Route>
        <Route path="/tasks">{connection && <Tasks connection={connection} />}</Route>
        <Route path="/admin">{connection && <Admin connection={connection} />}</Route>
        <Route path="/nav">
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
        <Route path="/">
          {page === 'index' && <Shout>Story Points</Shout>}
          {page === 'animals' && connection && <Animals connection={connection} />}
          {page === 'tasks' && connection && <Tasks connection={connection} />}
          {page === 'formula' && <Shout>Estimation = Complexity × Uncertainty × Volume</Shout>}
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

const Shout = styled.h1`
  margin: 0 auto;
  padding-top: 300px;
  text-align: center;
  font-size: 70px;
  color: #2b2b28;
`;
