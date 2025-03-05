import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CurriculoService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerCurriculo(obj){
    return this.httpClient
      .post<any>(`${this.baseUrl}/curriculos`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getCurriculo(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/curriculos/`).pipe(
      catchError((error) => {
        console.error('Error during fetching curriculo:', error);
        return throwError('Something went wrong during fetching curriculo.');
      })
    );
  }

  obterCurriculo(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/curriculos/${id}`);
  }

  UpdateCurriculo(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/curriculos/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteCurriculo(curriculoId: number) {
    return this.httpClient.delete(`${this.baseUrl}/curriculos/${curriculoId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting curriculo:', error);
        return throwError('Something went wrong during deleting curriculo.');
      })
    );
  }

  getTotalCurriculo(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/curriculos/count`).pipe(
      catchError((error) => {
        console.error('Error during fetching Total curriculo:', error);
        return throwError('Something went wrong during fetching Total curriculo.');
      })
    );
  }
}


