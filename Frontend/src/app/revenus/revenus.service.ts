import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/shared/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevenusService {

  constructor(private apiservice: ApiService, private http: HttpClient) {}

  async getRevenusList() {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus`, {}));
    return <any[]>response;
  }

  async getRevenuById(id: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/${id}`, {}));
    return <any[]>response;
  }

  async addRevenu(data: any) {
    const response = await lastValueFrom(this.apiservice.doPost('revenus', { data } as DataInput, {}));
   return <any[]>response;
  }


  async updateRevenu(id: number, data: any) {
    const response = await lastValueFrom(this.apiservice.doPut(`revenus/${id}`, { data } as DataInput, {}));
   return <any[]>response;
  }

  async deleteRevenu(data: any) {
    const response = await lastValueFrom(this.apiservice.doDel(`revenus/${data.id}`, {}));
   return <any[]>response;
  }

  async getRevenusByProjetId(id: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/projet/${id}`, {}));
    return <any[]>response;
  }

  async getRevenusByUserId(id: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/user/${id}`, {}));
    return <any[]>response;
  }

  async getRevenusByDate(date: string) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/date/${date}`, {}));
    return <any[]>response;
  }

  async getRevenusByDateAndProjetId(date: string, id: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/date/${date}/projet/${id}`, {}));
    return <any[]>response;
  }

  async getRevenusByDateAndUserId(date: string, id: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/date/${date}/user/${id}`, {}));
    return <any[]>response;
  }

  async getRevenusByDateAndProjetIdAndUserId(date: string, id: number, id2: number) {
    const response = await lastValueFrom(this.apiservice.doGet(`revenus/date/${date}/projet/${id}/user/${id2}`, {}));
    return <any[]>response;
  }

}
