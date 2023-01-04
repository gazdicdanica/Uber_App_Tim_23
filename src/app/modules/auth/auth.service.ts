import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/enviroments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '@angular/compiler'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    // this.user$.next(this.getRole());
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  login(auth: any): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + '/login', auth, {
      headers: this.headers,
    });
  }

    setUser(): void {
    this.user$.next(this.getRole());
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      let role = helper.decodeToken(accessToken).role[0].name;
      console.log("test1" + role);
      console.log("test2" + role);
      return role;
    }
    return null;
  }

}
