import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../model/WebSocketService';
import { Servo } from '../model/Servo';

@Component({
  providers: [WebSocketService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app works!';
  connection;
  private servo;

  constructor(
    private socket: WebSocketService,
  ){}
  ngOnInit(){
    let that = this;
    this.servo = {
      angle: 0,
      LEDs: [false, false]
    };
    this.socket.connect('hoge=hoge');
    this.connection = this.socket.on('Servo: connect').subscribe( data => {
      this.servo = data;
    });
    this.socket.on('LED: updated').subscribe( LEDs =>{
      this.servo.LEDs = LEDs;
    });
    this.socket.on('Angle: updated').subscribe( angle =>{
      this.servo.angle = angle;
    });
    this.socket.on('Vibrate: do').subscribe( angle =>{
      console.log('vibe');
      window.navigator.vibrate(200);
    });
  
    window.addEventListener('deviceorientation', orientationHandler, false);

    let cache = this.servo.angle;
    function orientationHandler(e){
      if (e.alpha == null){
        window.removeEventListener('deviceorientation', this);
        that.servo.angle = 'released';
        return;
      }
      cache = Math.round(e.gamma / 2);
      if(cache != that.servo.angle){
        that.socket.emit('Angle: change', cache);
        that.servo.angle = cache;
      }
    }
  }

  vibrate(){
    this.socket.emit('Vibrate: call');
  }

  changeLED(target: number){
    let led = {
      target,
      value: this.servo.LEDs[target]
    }
    this.socket.emit('LED: change', led);
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}
