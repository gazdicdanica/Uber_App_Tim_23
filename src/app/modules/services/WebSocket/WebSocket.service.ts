import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { NewRideDialogComponent } from '../../layout-module/new-ride-dialog/new-ride-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public stompClient: any = null;

  constructor() { }

  connect(newConnection : boolean){
    let socket = new SockJS("http://localhost:8080/socket");

    if(newConnection){
      return Stomp.over(socket);
    }
    if(this.stompClient == null){
      this.stompClient = Stomp.over(socket);
    }
    

    return this.stompClient;
  }
}
