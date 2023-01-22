import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  connect(){
    let socket = new SockJS("http://localhost:8080/socket");

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
