'use strict';
const
  // IO Events
  servoHandler = require('./server/ioHandler/servo'),
  // Depencendies
  express = require('express'),
  app = express(),
  server = require('http').createServer(app);
let
  io = require('socket.io').listen(server);

// app config
server.listen(process.env.PORT || 3000);
app.use(express.static('client'));
app.get('/client', function(req, res){
  res.send('welcome');
});
console.log('server started');

/*////
IO Events
///// */
servoHandler.init(io);
io.sockets.on('connection', function(socket){
  console.log('socket connected...');
  servoHandler.connect();

  socket.on('IoT: connected', servoHandler.IoTConnected);
  socket.on('Vibrate: call', servoHandler.vibrate);
  socket.on('LED: change', servoHandler.changeLED);
  socket.on('Angle: change', servoHandler.changeAngle);
})