import React, { useEffect, useState } from 'react';
import { connect, Message } from '../../infrastructure/ws';
import styled from 'styled-components';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import arrayMove from 'array-move';

export interface Task {
  name: string;
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
  const [tasks, setTasks] = useState<Task[]>([{ name: 'Wash windows', new: false }] as Task[]);

  const addNewTask = (taskName: string) => {
    // if (typeof tasks.find(task => task.name === taskName) !== 'undefined') {
    //   return;
    // }
    // setTasks(oldTasks => [...oldTasks, { name: taskName, new: true }]);

    setTasks(oldTasks => {
      if (typeof oldTasks.find(task => task.name === taskName) !== 'undefined') {
        return oldTasks;
      }

      return [...oldTasks, { name: taskName, new: true }];
    });
  };

  const onMessage = (message: Message) => message.type === 'task' && addNewTask(message.body);

  useEffect(() => {
    connect(() => {}, onMessage);
  }, [onMessage]);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setTasks(oldTasks => {
      oldTasks[oldIndex].new = false;
      return arrayMove(oldTasks, oldIndex, newIndex);
    });
  };

  return (
    <div>
      <SortableList axis="x" items={tasks} onSortEnd={onSortEnd} />
    </div>
  );
};

export default Tasks;

const SortedTasksContainer = styled.div`
  height: 340px;
  padding: 20px 0;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const TaskDiv = styled.div`
  margin: 0 5px;
  padding: 80px 15px;
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
    background: #c5ffa7;
  }

  & > .task-position {
    font-size: 12px;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
`;
