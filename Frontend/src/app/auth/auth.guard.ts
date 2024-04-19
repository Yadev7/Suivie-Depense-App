import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  adminList: any[] =[]

  constructor(private authService: AuthService, private router: Router){}

  async canActivate() {
    if(await this.checkLogin()){
       this.authService.isLoggedIn = true
      return true
    }
    this.router.navigate(['']);
     this.authService.isLoggedIn = false
    return false;
  }

  async checkLogin() {
     return localStorage.getItem("token")!=null
  }

}
