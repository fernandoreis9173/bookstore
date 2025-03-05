import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class EscolaridadeService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerEscolaridade(obj){
    return this.httpClient
      .post<any>(`${this.baseUrl}/escolaridade`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getEscolaridade(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/escolaridade/`).pipe(
      catchError((error) => {
        console.error('Error during fetching escolaridade:', error);
        return throwError('Something went wrong during fetching escolaridade.');
      })
    );
  }

  obterEscolaridade(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/escolaridade/${id}`);
  }

  UpdateEscolaridade(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/escolaridade/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteEscolaridade(escolaridadeId: number) {
    return this.httpClient.delete(`${this.baseUrl}/escolaridade/${escolaridadeId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting escolaridade:', error);
        return throwError('Something went wrong during deleting escolaridade.');
      })
    );
  }
}


