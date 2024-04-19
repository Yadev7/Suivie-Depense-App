import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class DepensesService {
    constructor(private apiservice: ApiService, private http: HttpClient) {}

    async getDepensesList() {
        const response = await lastValueFrom(this.apiservice.doGet(`depenses`, {}));
        return <any[]>response;
    }

    async getDepenseById(id: number) {
        const response = await lastValueFrom(this.apiservice.doGet(`depenses/${id}`, {}));
        return <any[]>response;
    }

    async addDepense(data: any) {
        const response = await lastValueFrom(this.apiservice.doPost('depenses', { data } as DataInput, {}));
       return <any[]>response;
    }

    async updateDepense(id: number, data: any) {
        const response = await lastValueFrom(this.apiservice.doPut(`depenses/${id}`, { data } as DataInput, {}));
       return <any[]>response;
    }

    async deleteDepense(data: any) {
        const response = await lastValueFrom(this.apiservice.doDel(`depenses/${data.id}`, {}));
       return <any[]>response;
    }
    
}
