import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + localStorage.getItem('token'))
      });
      return next.handle(authReq).pipe(map(resp=> {
        return resp;
      }));
    }

  }
}
