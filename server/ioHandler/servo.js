'use strict';

let
  state = {
    LEDs: [false, true],
    angle: 0
  },
  io;

module.exports = {
  init,
  connect,
  vibrate,
  changeLED,
  changeAngle
}


/*////
Declarations
///// */
function init(ioHandler){
  io = ioHandler;
}

function connect(data){
  io.sockets.emit('Servo: connect', state);
}

function vibrate(data){
  io.sockets.emit('Vibrate: do', true);
  console.log('vibrate');
}

function changeLED(data){
  state.LEDs[data.target] = data.value;
  io.sockets.emit('LED: updated', state.LEDs);
}
function changeAngle(data){
  state.angle = data;
  io.sockets.emit('Angle: updated', state.angle);
}