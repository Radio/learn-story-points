import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const Animals = () => {
  const [animals, setAnimals] = useState<String[]>(['Giraffe']);
  const [ws, setWs] = useState<WebSocket | undefined>();

  let timeout = 250;

  const connect = () => {
    let ws = new WebSocket('ws://localhost:3030');
    let connectInterval: any;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log('connected websocket main component');

      setWs(ws);

      ws.send("Here's some text that the server is urgently awaiting!");

      timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (timeout + timeout) / 1000
        )} second.`,
        e.reason
      );

      timeout = timeout + timeout; //increment retry interval
      connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = (err: Event) => {
      console.error('Socket encountered error', err, 'Closing socket');

      ws.close();
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log(event.data);
    };
  };

  const check = () => {
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      connect();
    }
  };

  // useEffect(() => {
  //   connect();
  // }, []);

  const dragHandlers = {
    onStart: () => {},
    onStop: () => {},
    defaultPosition: { x: 750, y: 500 },
  };

  return (
    <div>
      {animals.map((animal: String, index: number) => (
        <Draggable key={index} {...dragHandlers}>
          <Animal className="animal">{animal}</Animal>
        </Draggable>
      ))}
    </div>
  );
};

export default Animals;

const Animal = styled.div`
  width: 180px;
  height: 180px;
  text-align: center;
  padding: 10px;
  border: 1px solid #999;
  background: #fff;
  border-radius: 3px;
  cursor: grab;
  font-size: 30px;
`;
