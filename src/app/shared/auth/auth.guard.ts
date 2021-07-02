import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("sessionStorage.getItem('user')  ",localStorage.getItem('user'))
      if (!!localStorage.getItem('user')) {
      return true;
    }
    else {
      alert("Access denied");
      // this._router.navigate(['/login']);
      this._router.navigate(['/']);
      return false;
    }
  }
  
}
