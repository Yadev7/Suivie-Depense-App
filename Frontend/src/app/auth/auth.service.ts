
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DataInput } from 'src/app/shared/interface';

interface Response {
  token: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl!: string;

  abonnements: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  async login(data: DataInput) {
    try {
      const response: Response = await lastValueFrom(
        this.apiService.doPost(`auth/boxed-signin`, { data } as DataInput, {})
      );
      if (response.id) {
        localStorage.setItem("userId", response.id.toString());
        localStorage.setItem("token", response.token);
      }
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async register(data: DataInput) {
    try {
      const response: Response = await lastValueFrom(
        this.apiService.doPost(`users/add`, { data } as DataInput, {})
      );
    //   console.log(response);
      if (response.id) {
        localStorage.setItem("userId", response.id.toString());
        localStorage.setItem("token", response.token);
      }
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async getConnectedUser() {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        const response = await lastValueFrom(
          this.apiService.doGet('auth/get-connected-user', { headers: { Authorization: `Bearer ${token}` } })
        );
        return response; // Assuming the user information is in response.data
      }
    } catch (err: any) {
      console.error(err);
    }
    return null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.router.navigate(['/auth/boxed-signin']);
  }
}
