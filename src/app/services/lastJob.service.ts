import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class LastJobService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerLastJob(obj){
    return this.httpClient
      .post<any>(`${this.baseUrl}/lastJob`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getLastJob(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/lastJob/`).pipe(
      catchError((error) => {
        console.error('Error during fetching lastJob:', error);
        return throwError('Something went wrong during fetching lastJob.');
      })
    );
  }

  obterLastJob(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/lastJob/${id}`);
  }

  UpdateLastJob(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/lastJob/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteLastJob(lastJobId: number) {
    return this.httpClient.delete(`${this.baseUrl}/lastJob/${lastJobId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting lastJob:', error);
        return throwError('Something went wrong during deleting lastJob.');
      })
    );
  }
}


