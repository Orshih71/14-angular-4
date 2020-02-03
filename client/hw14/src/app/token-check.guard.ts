import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckGuard implements CanActivate {
  constructor(private router:Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem("token");
    if (token) return true;
    else return this.router.navigateByUrl('/signin');
  }

}
