import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketService{

  private url = 'http://localhost:3000';
  private socket;

  constructor(){}
  connect( queryString: string ){
    if (window.location.port == "4200") {
      this.socket = io( this.url, { query: queryString } );
    }else{
      this.socket = io.connect();
    }
  }

  emit( emitName: string, data? ){
    this.socket.emit( emitName, data );
  }

  on( onName: string ){
    let observable = new Observable( observer => {
      this.socket.on( onName, ( data ) => {
        observer.next( data );
      });

      return () => { this.socket.disconnect(); };
    } );
    return observable;
  }

}