export interface OnOpen {
  (ws: WebSocket): void;
}

export interface OnMessage {
  (message: Message): void;
}

export interface Message {
  type: string;
  body: any;
}

export interface CloseConnection {
  (): void;
}

export interface Connection {
  close: CloseConnection;
}

let timeout = 250;

export const connect = (onOpen: OnOpen, onMessage?: OnMessage): Connection => {
  let wsUrl =
    process.env.NODE_ENV === 'development'
      ? 'ws://localhost:3030'
      : window.location.protocol.replace('http', 'ws') + '//' + window.location.host;
  let ws = new WebSocket(wsUrl);
  let connectInterval: any;

  const check = () => {
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      connect(onOpen, onMessage);
    }
  };

  // websocket onopen event listener
  ws.onopen = () => {
    console.log('Connected to a websocket');

    onOpen(ws);

    timeout = 250; // reset timer to 250 on open of websocket connection
    clearTimeout(connectInterval); // clear Interval on on open of websocket connection
  };

  // websocket onclose event listener
  ws.onclose = e => {
    console.log(
      `Socket is closed. Reconnect will be attempted in ${Math.min(10000 / 1000, (timeout + timeout) / 1000)} second.`,
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

  if (onMessage) {
    ws.onmessage = (event: MessageEvent) => {
      onMessage(JSON.parse(event.data));
    };
  }

  return {
    close: () => {
      console.log('Closing the websocket connection');
      ws.close();
    },
  };
};
