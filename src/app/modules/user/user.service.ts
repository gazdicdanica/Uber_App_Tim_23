import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getData(id: number): Observable<User>{
    return this.httpClient.get<User>(environment.apiHost+ '/passenger/' + id);
  }

}
