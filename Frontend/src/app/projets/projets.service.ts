import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class ProjetsService {
    constructor(private apiservice: ApiService) {}

    async getProjetsList() {
        const response = await lastValueFrom(this.apiservice.doGet(`projects`, {}));
        return <any[]>response;
    }

    async addProjet(data: any) {
        const response = await lastValueFrom(this.apiservice.doPost('projects', { data } as DataInput, {}));
        return <any[]>response;
    }

    async updateProjets(id: number, data: any) {
        const response = await lastValueFrom(this.apiservice.doPut(`projects/${id}`, { data } as DataInput, {}));
        return <any[]>response;
    }

    async deleteProjet(data: any) {
        const response = await lastValueFrom(this.apiservice.doDel(`projects/${data.id}`, {}));
        return <any[]>response;
    }
}
