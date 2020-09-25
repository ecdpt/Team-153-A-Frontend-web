import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GH_AUTH_TOKEN } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let url: string = state.url;

      let res =  this.checkLogin(url);
      
      return res;
  }

  checkLogin(url: string): boolean{
    const token = localStorage.getItem(GH_AUTH_TOKEN);
    if(token) return true; 
    this.router.navigate(['login']);
  
    return false;
  }

  
}
