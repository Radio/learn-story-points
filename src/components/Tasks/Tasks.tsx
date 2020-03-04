import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { UsesConnection } from '../../infrastructure/usesConnection';

const possibleEstimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];

export interface Task {
  id: number;
  name: string;
  new: boolean;
  estimation: number;
  image?: string;
}

interface OnEstimationChanged {
  (taskPosition: number, estimation: number): void;
}

interface SortableItemProps {
  task: Task;
  taskIndex: number;
  onEstimationChanged: OnEstimationChanged;
  showEstimation: boolean;
}

interface SortableListProps {
  items: Task[];
  onEstimationChanged: OnEstimationChanged;
  showEstimation: boolean;
}

const SortableItem = SortableElement(({ task, taskIndex, onEstimationChanged, showEstimation }: SortableItemProps) => {
  const setEstimation = (value: number) => {
    onEstimationChanged(taskIndex, value);
  };
  const setCorrectedEstimation = (value: number) => {
    onEstimationChanged(taskIndex, correctEstimation(value));
  };

  const correctEstimation = (givenValue: number): number => {
    for (let i = 0; i < possibleEstimationValues.length; i++) {
      if (possibleEstimationValues[i] >= givenValue) {
        return possibleEstimationValues[i];
      }
    }

    return possibleEstimationValues[possibleEstimationValues.length - 1];
  };

  return (
    <TaskDiv className={'with-estimation-x ' + (task.new ? 'new' : 'old')}>
      {task.image ? <img src={'/images/tasks/' + task.image} alt={task.name} /> : ''}
      <p>{task.name}</p>
      {showEstimation && (
        <Estimation
          type="text"
          value={task.estimation || ''}
          onChange={event => setEstimation(parseInt(event.target.value) || 0)}
          onBlur={event => setCorrectedEstimation(parseInt(event.target.value) || 0)}
        />
      )}
      <TaskPosition>{taskIndex + 1}</TaskPosition>
    </TaskDiv>
  );
});

const SortableList = SortableContainer(({ items, onEstimationChanged, showEstimation }: SortableListProps) => {
  return (
    <SortedTasksContainer>
      {items.map((task: Task, index: number) => (
        <SortableItem
          key={`item-${task.id}`}
          index={index}
          task={task}
          taskIndex={index}
          onEstimationChanged={onEstimationChanged}
          showEstimation={showEstimation}
        />
      ))}
    </SortedTasksContainer>
  );
});

const Tasks = ({ connection }: UsesConnection) => {
  let firstTask = { id: 0, name: 'Iron shirts', image: 'shirt.svg', new: false, estimation: 0 };
  const [tasks, setTasks] = useState<Task[]>([firstTask] as Task[]);
  const [showEstimation, setShowEstimation] = useState(false);

  const addNewTask = (taskName: string, taskImage?: string) => {
    setTasks(oldTasks => {
      if (oldTasks.findIndex(task => task.name === taskName) >= 0) {
        return oldTasks;
      }

      return [...oldTasks, { id: oldTasks.length, name: taskName, image: taskImage, new: true, estimation: 0 }];
    });
  };

  useEffect(() => {
    connection.addListener('task', body => {
      addNewTask(body.name, body.image);
    });
    connection.addListener('estimation', setShowEstimation);
  }, [connection]);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setTasks(oldTasks => {
      oldTasks[oldIndex].new = false;

      return arrayMove(oldTasks, oldIndex, newIndex);
    });
  };

  const onEstimationChanged = (taskIndex: number, estimation: number) => {
    setTasks(oldTasks => {
      let newTasks = [...oldTasks];
      newTasks[taskIndex].estimation = estimation;
      newTasks[taskIndex].new = false;

      console.log(taskIndex, estimation);

      return newTasks;
    });
  };

  return (
    <Desk>
      <SortableList
        axis="x"
        items={tasks}
        onSortEnd={onSortEnd}
        onEstimationChanged={onEstimationChanged}
        showEstimation={showEstimation}
      />
      {showEstimation && (
        <EstimationValues>
          {possibleEstimationValues.map(value => (
            <span>{value}</span>
          ))}
        </EstimationValues>
      )}
    </Desk>
  );
};

export default Tasks;

const Desk = styled.div`
  height: 100%;
  background: #5a4c49;
  padding: 100px 20px 0;
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

  & > img {
    padding-bottom: 10px;
    width: 90%;
    margin: 0 auto;
  }

  & > p {
    margin: 20px 0;
  }
`;

const TaskPosition = styled.span`
  font-size: 12px;
  display: inline-block;
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

const Estimation = styled.input`
  position: absolute;
  bottom: 9px;
  left: 10px;
  text-align: center;
  width: 40px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: transparent;
`;

const EstimationValues = styled.p`
  font-size: 80px;
  text-align: center;
  color: #c4e3cb;
  opacity: 0.3;

  & > span {
    margin: 0 30px;
  }
`;
