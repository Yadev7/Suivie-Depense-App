import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate() {
    if(await this.checkLogin()) {
      this.authService.isLoggedIn = true;
      return true;
    }
    this.router.navigate(['']);
    this.authService.isLoggedIn = false;
    return false;
  }

  async checkLogin() {
    return localStorage.getItem("token")!=null
 }

}
