import React from 'react';
import AddAnimals from './Animals/AddAnimals';
import AddTasks from './Tasks/AddTasks';
import styled from 'styled-components';
import { UsesConnection } from '../infrastructure/usesConnection';

const Admin = ({ connection }: UsesConnection) => {
  const showPage = (page: string) => {
    connection.send('page', page);
  };

  return (
    <AdminPage>
      <Title>Story Points</Title>
      <ShowPageButton onClick={() => showPage('index')}>Show</ShowPageButton>

      <Title>Animals</Title>
      <ShowPageButton onClick={() => showPage('animals')}>Show</ShowPageButton>
      {connection && <AddAnimals connection={connection} />}

      <Title>Tasks</Title>
      <ShowPageButton onClick={() => showPage('tasks')}>Show</ShowPageButton>
      {connection && <AddTasks connection={connection} />}

      <Title>Formula</Title>
      <ShowPageButton onClick={() => showPage('formula')}>Show</ShowPageButton>
    </AdminPage>
  );
};

export default Admin;

const AdminPage = styled.div`
  padding-bottom: 100px;
`;

const Title = styled.h2`
  margin: 50px 0 30px;
  text-align: center;
  font-size: 34px;
`;

const ShowPageButton = styled.button`
  margin: 0 auto;
  display: block;
  font-size: 14px;
`;
