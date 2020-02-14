import React, { useEffect, useState } from 'react';
import { connect, Message } from '../../infrastructure/ws';
import styled from 'styled-components';

export interface TaskToAdd {
  name: string;
  added: boolean;
}

const knownTasks: TaskToAdd[] = [
  { name: 'Buy milk', added: false },
  { name: 'Paint the fence', added: false },
  { name: 'Send a letter', added: false },
  { name: 'Visit grandparents', added: false },
  { name: 'Water flowers', added: false },
  { name: 'Cook dinner', added: false },
  { name: 'Buy food for the week', added: false },
  { name: 'Call mom', added: false },
  { name: 'Wash dishes', added: false },
  { name: 'Change lock in the door', added: false },
  { name: 'Change bed linen', added: false },
  { name: 'Find the remote controller', added: false },
];

const AddTasks = () => {
  const [tasks, setTasks] = useState<TaskToAdd[]>([] as TaskToAdd[]);
  const [customTask, setCustomTask] = useState('');
  const [ws, setWs] = useState<WebSocket | undefined>();

  const onOpen = (ws: WebSocket) => {
    setWs(ws);
    setTasks(knownTasks);
  };

  const onMessage = (message: Message) => {};

  useEffect(() => {
    connect(onOpen, onMessage);
  }, []);

  const addAnimal = (animal: TaskToAdd) => {
    if (!ws) {
      return;
    }

    console.log('Adding', animal.name);
    ws.send(JSON.stringify({ type: 'task', body: animal.name }));
    animal.added = true;
    setTasks([...tasks]);
  };

  const addCustomAnimal = () => {
    if (!ws || !customTask) {
      return;
    }

    console.log('Adding custom', customTask);
    ws.send(JSON.stringify({ type: 'task', body: customTask }));
    setCustomTask('');
  };

  return (
    <div>
      <TaskList>
        {tasks.map((animal: TaskToAdd) => (
          <Task key={animal.name} className={animal.added ? 'added' : 'not-added'} onClick={() => addAnimal(animal)}>
            <p>{animal.name}</p>
          </Task>
        ))}
      </TaskList>
      <Buttons>
        <div>
          <label>Custom: </label>
          <input value={customTask} onChange={event => setCustomTask(event.target.value)} />
          <button onClick={() => addCustomAnimal()}>Add</button>
        </div>
      </Buttons>
    </div>
  );
};

export default AddTasks;

const TaskList = styled.div`
  width: 80%;
  margin: 30px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Task = styled.div`
  width: 200px;
  height: 300px;
  padding: 80px 5px;
  text-align: center;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 20px;

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
