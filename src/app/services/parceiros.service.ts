import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ParceirosService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerParceiros(obj) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/partners`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getParceiros(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/partners/`).pipe(
      catchError((error) => {
        console.error('Error during fetching partners:', error);
        return throwError('Something went wrong during fetching partners.');
      })
    );
  }

  obterParceiros(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/partners/${id}`);
  }

  UpdateParceiros(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/partners/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteParceiros(partnersId: number) {
    return this.httpClient.delete(`${this.baseUrl}/partners/${partnersId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting partners:', error);
        return throwError('Something went wrong during deleting partners.');
      })
    );
  }

  getParceiroByCNPJ(cnpj: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/partners/buscar?cnpj=${cnpj}`);
  }
}


