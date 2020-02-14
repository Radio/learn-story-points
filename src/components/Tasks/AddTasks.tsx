import React, { useEffect, useState } from 'react';
import { connect } from '../../infrastructure/ws';
import styled from 'styled-components';

export interface TaskToAdd {
  name: string;
  image: string;
  added: boolean;
}

const knownTasks: TaskToAdd[] = [
  { name: 'Buy milk', image: 'milk.svg', added: false },
  { name: 'Paint the fence', image: 'paint.svg', added: false },
  { name: 'Send a letter', image: 'send-mail.svg', added: false },
  { name: 'Visit parents', image: 'visit-parents.svg', added: false },
  { name: 'Water flowers', image: 'water-flowers.svg', added: false },
  { name: 'Cook dinner', image: 'dinner.svg', added: false },
  { name: 'Buy food for the week', image: 'food.svg', added: false },
  { name: 'Call mom', image: 'phone.svg', added: false },
  { name: 'Wash dishes', image: 'wash.svg', added: false },
  { name: 'Change lock in the door', image: 'screwdrivers.svg', added: false },
  { name: 'Change bed linen', image: 'bed.svg', added: false },
  { name: 'Find the remote controller', image: 'tv.svg', added: false },
];

const AddTasks = () => {
  const [tasks, setTasks] = useState<TaskToAdd[]>([] as TaskToAdd[]);
  const [customTask, setCustomTask] = useState('');
  const [ws, setWs] = useState<WebSocket | undefined>();

  const onOpen = (ws: WebSocket) => {
    setWs(ws);
    setTasks(knownTasks);
  };

  useEffect(() => {
    connect(onOpen);
  }, []);

  const addTask = (task: TaskToAdd) => {
    if (!ws) {
      return;
    }

    ws.send(JSON.stringify({ type: 'task', body: { name: task.name, image: task.image } }));
    task.added = true;
    setTasks([...tasks]);
  };

  const addCustomTask = () => {
    if (!ws || !customTask) {
      return;
    }

    console.log('Adding custom', customTask);
    ws.send(JSON.stringify({ type: 'task', body: { name: customTask } }));
    setCustomTask('');
  };

  return (
    <div>
      <TaskList>
        {tasks.map((task: TaskToAdd) => (
          <Task key={task.name} className={task.added ? 'added' : 'not-added'} onClick={() => addTask(task)}>
            <img src={'/images/tasks/' + task.image} width={150} alt="" />
            <p>{task.name}</p>
          </Task>
        ))}
      </TaskList>
      <Buttons>
        <div>
          <label>Custom: </label>
          <input value={customTask} onChange={event => setCustomTask(event.target.value)} />
          <button onClick={() => addCustomTask()}>Add</button>
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
  padding: 40px 5px;
  text-align: center;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 20px;

  &.added {
    opacity: 0.1;
  }

  & > img {
    padding-bottom: 10px;
  }

  & > p {
    margin: 20px 0;
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
