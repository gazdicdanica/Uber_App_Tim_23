import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    return this.checkUserLogin(route, state.url);
  }
  

  checkUserLogin(route: ActivatedRouteSnapshot, url: any) : boolean{
    if(this.authService.isLoggedIn()){
      const userRole = this.authService.getRole();

      if(route.data['role'] && route.data['role'].indexOf(userRole) === -1){
        this.router.navigate(["/"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }
}
