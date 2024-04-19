import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataInput } from './shared/interface';

@Injectable({
    providedIn: "root",
  })
  export class ApiService {
    private apiUrl: string;
    constructor(
      private http: HttpClient,
    //   private messageService: MessageService
    )
    {
      this.apiUrl = environment.api;
    }

    private _generateUrl(url_complement: string, params: any = {}): string {
      return `${this.apiUrl}/${url_complement}`;
    }

    doGet<Type>(url: string, params: any) {
      return this.http
        .get<Type>(this._generateUrl(url, params))
        .pipe(map((response) => response));
    }

    doGetById<Type>(url: string, id: any): Observable<Type> {
      const apiUrlWithId = `${this._generateUrl(url)}/${id}`;

      return this.http
        .get<Type>(apiUrlWithId)
        .pipe(
          map((response) => response),
        //   catchError((error) => this.handleError(error, null))
        );
    }

    doPost<Type>(url: string, data: DataInput, params: any) {
      return this.http.post<Type>(this._generateUrl(url, params), data.data).pipe(
        map((response) => response),
        // catchError((error) => this.handleError(error, null))
      );
    }

    doPut<Type>(url: string, data: DataInput, params: any) {
      return this.http.put<Type>(this._generateUrl(url, params), data.data).pipe(
        map((response) => response),
        // catchError((error) => this.handleError(error, null))
      );
    }

    doDel<Type>(url: string, params: any) {
      return this.http
        .delete<Type>(this._generateUrl(url, params))
        .pipe(map((response) => response));
    }

  }
