import React, { useEffect, useState } from 'react';
import Animal from './Animal';
import styled from 'styled-components';
import { UsesConnection } from '../../infrastructure/usesConnection';

const Animals = ({ connection }: UsesConnection) => {
  const [animals, setAnimals] = useState<string[]>([]);

  const addNewAnimal = (animal: string) => {
    setAnimals(oldAnimals => {
      if (oldAnimals.indexOf(animal) >= 0) {
        return oldAnimals;
      }

      return [...oldAnimals, animal];
    });
  };

  useEffect(() => {
    connection.addListener('animal', addNewAnimal);
  }, [connection]);

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
