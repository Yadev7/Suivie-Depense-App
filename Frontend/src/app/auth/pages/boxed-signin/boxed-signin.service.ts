import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private apiservice: ApiService,

  ) { }

  async getUsersList() {
    const response = await lastValueFrom(
      this.apiservice.doGet(`users`, {})
    );
    return <any[]>response
  }

  async getUserById(userID: any) {
    //   console.log(`Fetching user with ID ${userID}`);
      const response = await lastValueFrom(
        this.apiservice.doGet(`users/${userID}`, {})
      );
      return response;
  }

}
