import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');
    const decodedItem = JSON.parse(accessToken);
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      console.log(decodedItem);
      const cloned = req.clone({
        headers: req.headers.set('authorization', "Bearer " + decodedItem.accessToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}