import React, { useEffect, useState } from 'react';
import { connect, Message } from '../../infrastructure/ws';
import styled from 'styled-components';

export interface AnimalToAdd {
  name: string;
  added: boolean;
}

const knownAnimals = [
  { name: 'Giraffe', added: false },
  { name: 'Horse', added: false },
  { name: 'Mouse', added: false },
  { name: 'Elephant', added: false },
  { name: 'Crocodile', added: false },
  { name: 'Cat', added: false },
  { name: 'Dog', added: false },
  { name: 'Puma', added: false },
  { name: 'Chicken', added: false },
  { name: 'Kangaroo', added: false },
  { name: 'Snake', added: false },
  { name: 'Lion', added: false },
];

const AddAnimals = () => {
  const [animals, setAnimals] = useState<AnimalToAdd[]>([] as AnimalToAdd[]);
  const [customAnimal, setCustomAnimal] = useState('');
  const [ws, setWs] = useState<WebSocket | undefined>();

  const onOpen = (ws: WebSocket) => {
    setWs(ws);
    setAnimals(knownAnimals);
  };

  const onMessage = (message: Message) => {};

  useEffect(() => {
    connect(onOpen, onMessage);
  }, []);

  const addAnimal = (animal: AnimalToAdd) => {
    if (!ws) {
      return;
    }

    console.log('Adding', animal.name);
    ws.send(JSON.stringify({ type: 'animal', body: animal.name }));
    animal.added = true;
    setAnimals([...animals]);
  };

  const addCustomAnimal = () => {
    if (!ws || !customAnimal) {
      return;
    }

    console.log('Adding custom', customAnimal);
    ws.send(JSON.stringify({ type: 'animal', body: customAnimal }));
    setCustomAnimal('');
  };

  const setCages = (howMany: string) => {
    if (!ws) {
      return;
    }

    console.log('Settings cages', howMany);
    ws.send(JSON.stringify({ type: 'cages', body: howMany }));
  };

  return (
    <div>
      <AnimalList>
        {animals.map((animal: AnimalToAdd) => (
          <Animal key={animal.name} className={animal.added ? 'added' : 'not-added'} onClick={() => addAnimal(animal)}>
            {animal.name}
          </Animal>
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

const Animal = styled.div`
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
  margin: 20px;
  border: 1px solid #999;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 30px;

  &.added {
    opacity: 0.5;
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
