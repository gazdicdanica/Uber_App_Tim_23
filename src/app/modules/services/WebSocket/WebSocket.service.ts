import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public stompClient: any = null;

  constructor() { }

  connect(){
    let socket = new SockJS("http://localhost:8080/socket");

    if(this.stompClient == null){
      this.stompClient = Stomp.over(socket);
    }
    

    return this.stompClient;
  }
}
