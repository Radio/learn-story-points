import React from 'react';
import Cages from './Cages';
import Animals from './Animals';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AddAnimals from './AddAnimals';

const Index = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/add`}>
        <AddAnimals />
      </Route>
      <Route path={match.path}>
        <Cages />
        <Animals />
      </Route>
    </Switch>
  );
};

export default Index;
