const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || process.argv[2] || 3000;
const app = express().use(express.static(path.join(__dirname, 'build')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log(data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log('sending back:', data);
        client.send(data);
      }
    });
  });
});
