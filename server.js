const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || process.argv[2] || 3000;
const app = express()
  .use('/', express.static(path.join(__dirname, 'build')))
  .use('/*.*', (req, res) => {
    res.status(404).send('404 Not found');
  })
  .use('/**', (req, res) => {
    req.url = 'index.html';
    app.handle(req, res);
  });

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

webSocketServer.on('connection', function connection(client) {
  const pingInterval = setInterval(function ping() {
    const pingPayload = { type: 'ping', body: new Date() };
    console.log('Pinging with', pingPayload);
    client.send(JSON.stringify(pingPayload));
  }, 1000);

  client.on('message', function incoming(data) {
    console.log(data);
    webSocketServer.clients.forEach(function each(anotherClient) {
      if (anotherClient !== client && anotherClient.readyState === WebSocket.OPEN) {
        console.log('sending back:', data);
        anotherClient.send(data);
      }
    });
  });

  client.on('close', function() {
    clearInterval(pingInterval);
  });
});
