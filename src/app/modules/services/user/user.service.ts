import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  sendResetCode(emailToSend: String): Observable<any> {
    const data = {
      email: emailToSend,
    }
    return this.httpClient.put<any>(environment.apiHost + "/user/forgotPassword", data);
  }

  resetPassword(value: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost+"/user/resetPassword", value);
  }

  doesUserExist(email: any): Observable<any> {
    return this.httpClient.get<any>(environment.apiHost+"/user/exist/"+email);
  } 

  getDriverData(id : number) : Observable<User> {
    return this.httpClient.get<User>(environment.apiHost+"/driver/" + id);
  }

  getPassengerData(id: number) : Observable<User> {
    return this.httpClient.get<User>(environment.apiHost+"/passenger/" + id);
  }
}
