import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    constructor(private apiservice: ApiService) {}

    async getUsersList() {
        const response = await lastValueFrom(this.apiservice.doGet(`users`, {}));
        return <any[]>response;
    }
}
