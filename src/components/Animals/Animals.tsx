import React, { useEffect, useState } from 'react';
import Animal from './Animal';
import { connect, Message } from '../../infrastructure/ws';
import styled from 'styled-components';

const Animals = () => {
  const [animals, setAnimals] = useState<string[]>([]);

  const onMessage = (message: Message) => {
    if (message.type === 'animal') {
      setAnimals(oldAnimals => [...oldAnimals, message.body]);
    }
  };

  useEffect(() => {
    connect(() => {}, onMessage);
  }, []);

  return (
    <AnimalsContainer>
      {animals.map((animal: string, index: number) => (
        <Animal key={index} name={animal} />
      ))}
    </AnimalsContainer>
  );
};

export default Animals;

const AnimalsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
