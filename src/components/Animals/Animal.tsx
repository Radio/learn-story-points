import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

export interface AnimalProps {
  name: String;
}

const Animal = ({ name }: AnimalProps) => {
  const dragHandlers = {
    onStart: () => {},
    onStop: () => {},
    defaultPosition: { x: 750, y: 500 },
  };

  return (
    <Draggable {...dragHandlers}>
      <AnimalDiv className="animal">{name}</AnimalDiv>
    </Draggable>
  );
};

export default Animal;

const AnimalDiv = styled.div`
  width: 180px;
  height: 180px;
  text-align: center;
  padding: 10px;
  border: 1px solid #999;
  background: #fff;
  border-radius: 3px;
  cursor: grab;
  font-size: 30px;
`;
