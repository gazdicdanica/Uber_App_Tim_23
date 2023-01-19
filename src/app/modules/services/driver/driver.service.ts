import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Location } from '../../map/Location';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getDriverLocation(id: number): Observable<Location> {
    return this.httpClient.get<Location>(environment.apiHost + '/driver/'+id+'/location');
  }

  getId(): number {
    return this.authService.getId();
  }
}
