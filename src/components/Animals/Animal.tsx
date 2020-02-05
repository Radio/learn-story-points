import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

export interface AnimalProps {
  name: String;
  x?: number;
  y?: number;
}

const animalHeight = 100;
const animalWidth = 180;

const Animal = ({ name, x, y }: AnimalProps) => {
  x = x || window.innerWidth / 2 - animalWidth / 2;
  y = y || window.innerHeight - animalHeight - 50;
  const dragHandlers = {
    defaultPosition: { x, y },
  };

  console.log(name, x, y);

  return (
    <Draggable {...dragHandlers}>
      <AnimalDiv className="animal">{name}</AnimalDiv>
    </Draggable>
  );
};

export default Animal;

const AnimalDiv = styled.div`
  line-height: 100px;
  position: absolute;
  width: ${animalWidth}px;
  height: ${animalHeight}px;
  text-align: center;
  border: 1px solid #999;
  background: #fff;
  cursor: grab;
  font-size: 30px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
`;
