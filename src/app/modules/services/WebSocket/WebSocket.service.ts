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

  connect(){
    let socket = new SockJS("http://192.168.0.21:8080/socket");

    this.stompClient = Stomp.over(socket);
   
    return this.stompClient;
  }

  closeConnection(){
    if(this.stompClient){
      this.stompClient.disconnect();
    }
    
  }
}
