import React from 'react';
import Cages from './Cages';
import Animals from './Animals';
import { UsesConnection } from '../../infrastructure/usesConnection';

const Index = ({ connection }: UsesConnection) => {
  return (
    <div style={{ height: '100%' }}>
      <Cages connection={connection} />
      <Animals connection={connection} />
    </div>
  );
};

export default Index;
