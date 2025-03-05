import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class InformacoesService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerInformacoes(obj){
    return this.httpClient
      .post<any>(`${this.baseUrl}/infoImportante`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getInformacoes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/infoImportante/`).pipe(
      catchError((error) => {
        console.error('Error during fetching informacoes:', error);
        return throwError('Something went wrong during fetching informacoes.');
      })
    );
  }

  obterInformacoes(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/infoImportante/${id}`);
  }

  UpdateInformacoes(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/infoImportante/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteInformacoes(InformacoesId: number) {
    return this.httpClient.delete(`${this.baseUrl}/infoImportante/${InformacoesId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting Informacoes:', error);
        return throwError('Something went wrong during deleting Informacoes.');
      })
    );
  }
}


