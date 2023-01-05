import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{

  activationId!: number;

  constructor(private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.activationId = params['code'];
      this.authService.activate(this.activationId).subscribe(
        {
          next: (res) => {
          }
        }
      );
    })    
  }

}
