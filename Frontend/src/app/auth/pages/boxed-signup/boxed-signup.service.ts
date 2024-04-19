import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';


@Injectable({
    providedIn: 'root',

})

export class SignUpService {

    constructor(
        private apiservice: ApiService,
      ) { }

      async createUser(userData: DataInput) {
        try {
            const response = await lastValueFrom(
                this.apiservice.doPost('users/add', userData, {})
            );
            // console.log(response);
          return response;
        } catch (error) {
          // Handle error, e.g., logging or displaying an error message
          console.error('Error creating user:', error);
          throw error;
        }
      }

      async getUserById(userID: any) {
        // console.log(`Fetching user with ID ${userID}`);
        const response = await lastValueFrom(
          this.apiservice.doGet(`users/${userID}`, {})
        );
        // console.log(response);
        return response;
    }

}
