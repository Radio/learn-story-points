import React from 'react';
import Tasks from './Tasks';
import { UsesConnection } from '../../infrastructure/usesConnection';

const Index = ({ connection }: UsesConnection) => {
  return connection && <Tasks connection={connection} />;
};

export default Index;
