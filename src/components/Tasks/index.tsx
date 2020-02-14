import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Tasks from './Tasks';
import AddTasks from './AddTasks';

const Index = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/add`}>
        <AddTasks />
      </Route>
      <Route path={match.path}>
        <Tasks />
      </Route>
    </Switch>
  );
};

export default Index;
