import React, { useEffect, useState } from 'react';
import { connect, Message } from '../../infrastructure/ws';
import styled from 'styled-components';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import arrayMove from 'array-move';

export interface Task {
  name: string;
  image?: string;
  new?: boolean;
}

interface SortableItemProps {
  task: Task;
  taskPosition: number;
}

interface SortableListProps {
  items: Task[];
}

const SortableItem = SortableElement(({ task, taskPosition }: SortableItemProps) => (
  <TaskDiv className={task.new ? 'new' : 'old'}>
    {task.image ? <img src={'/images/tasks/' + task.image} width="90%" alt="" /> : ''}
    <p>{task.name}</p>
    <span className="task-position">{taskPosition}</span>
  </TaskDiv>
));

const SortableList = SortableContainer(({ items }: SortableListProps) => {
  return (
    <SortedTasksContainer>
      {items.map((task: Task, index: number) => (
        <SortableItem key={`item-${index}`} index={index} task={task} taskPosition={index + 1} />
      ))}
    </SortedTasksContainer>
  );
});

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([{ name: 'Iron shirts', image: 'shirt.svg', new: false }] as Task[]);

  const addNewTask = (taskName: string, taskImage?: string) => {
    setTasks(oldTasks => {
      if (oldTasks.findIndex(task => task.name === taskName) >= 0) {
        return oldTasks;
      }

      return [...oldTasks, { name: taskName, image: taskImage, new: true }];
    });
  };

  useEffect(() => {
    const onMessage = (message: Message) =>
      message.type === 'task' && addNewTask(message.body.name, message.body.image);
    connect(() => {}, onMessage);
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setTasks(oldTasks => {
      oldTasks[oldIndex].new = false;

      return arrayMove(oldTasks, oldIndex, newIndex);
    });
  };

  return (
    <Desk>
      <SortableList axis="x" items={tasks} onSortEnd={onSortEnd} />
    </Desk>
  );
};

export default Tasks;

const Desk = styled.div`
  height: 100%;
  background: #5a4c49;
  padding-top: 100px;
`;

const SortedTasksContainer = styled.div`
  height: 340px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

const TaskDiv = styled.div`
  margin: 0 5px;
  padding: 40px 15px;
  width: 200px;
  height: 300px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: grab;
  font-size: 20px;
  position: relative;

  &.new {
    background: #c4e3cb;
    border-color: #8aae92;
  }

  & > .task-position {
    font-size: 12px;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    right: 10px;
  }

  & > img {
    padding-bottom: 10px;
  }

  & > p {
    margin: 20px 0;
  }
`;
