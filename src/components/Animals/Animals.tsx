import React, { useEffect, useState } from 'react';
import Animal from './Animal';

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

  return (
    <div>
      {animals.map((animal: String, index: number) => (
        <Animal key={index} name={animal} />
      ))}
    </div>
  );
};

export default Animals;
