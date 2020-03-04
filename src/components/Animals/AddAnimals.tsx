import React, { useState } from 'react';
import styled from 'styled-components';
import { UsesConnection } from '../../infrastructure/usesConnection';

export interface AnimalToAdd {
  name: string;
  added: boolean;
}

const knownAnimals = [
  { name: 'Camel', added: false },
  { name: 'Crocodile', added: false },
  { name: 'Elephant', added: false },
  { name: 'Fox', added: false },
  { name: 'Giraffe', added: false },
  { name: 'Hippopotamus', added: false },
  { name: 'Kangaroo', added: false },
  { name: 'Koala', added: false },
  { name: 'Lion', added: false },
  { name: 'Meerkat', added: false },
  { name: 'Monkey', added: false },
  { name: 'Owl', added: false },
  { name: 'Polar bear', added: false },
  { name: 'Rabbit', added: false },
  { name: 'Rhino', added: false },
  { name: 'Sloth', added: false },
  { name: 'Squirrel', added: false },
  { name: 'Zebra', added: false },
];

const AddAnimals = ({ connection }: UsesConnection) => {
  const [animals, setAnimals] = useState<AnimalToAdd[]>(knownAnimals);
  const [customAnimal, setCustomAnimal] = useState('');

  const addAnimal = (animal: AnimalToAdd) => {
    connection.send('animal', animal.name);
    animal.added = true;
    setAnimals([...animals]);
  };

  const addCustomAnimal = () => {
    if (!customAnimal) {
      return;
    }

    connection.send('animal', customAnimal);
    setCustomAnimal('');
  };

  const setCages = (howMany: string) => {
    connection.send('cages', howMany);
  };

  return (
    <div>
      <AnimalList>
        {animals.map((animal: AnimalToAdd) => (
          <Animal
            key={animal.name}
            className={animal.added ? 'added' : 'not-added'}
            onClick={() => addAnimal(animal)}
            bgImage={'/images/animals/' + animal.name.toLowerCase().replace(' ', '-') + '.svg'}
          />
        ))}
      </AnimalList>
      <Buttons>
        <div>
          <label>Custom: </label>
          <input value={customAnimal} onChange={event => setCustomAnimal(event.target.value)} />
          <button onClick={() => addCustomAnimal()}>Add</button>
        </div>
        <button onClick={() => setCages('three')}>3 cages</button>
        <button onClick={() => setCages('five')}>5 cages</button>
      </Buttons>
    </div>
  );
};

export default AddAnimals;

const AnimalList = styled.div`
  width: 80%;
  margin: 30px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Animal = styled.div<{ bgImage: string }>`
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
  margin: 20px;
  border: 1px solid #999;
  background-color: #fff;
  background-position: center center;
  background-image: url(${props => props.bgImage});
  background-repeat: no-repeat;
  background-size: 85%;
  cursor: pointer;
  font-size: 30px;

  &.added {
    opacity: 0.1;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 20px;

  input {
    font-size: 20px;
    margin: 0 5px;
  }

  button {
    font-size: 20px;
    margin: 0 20px;
  }
`;
