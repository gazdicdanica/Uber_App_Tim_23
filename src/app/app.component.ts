import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './modules/services/WebSocket/WebSocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private wsService : WebSocketService) {
    wsService.connect();
  }

  ngOnInit(): void {}

  title = 'FRONT';
}
