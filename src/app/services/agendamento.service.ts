import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerAgendamento(obj) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/agendamento`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getAgendamento(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/agendamento/`).pipe(
      catchError((error) => {
        console.error('Error during fetching agendamento:', error);
        return throwError('Something went wrong during fetching agendamento.');
      })
    );
  }

  obterAgendamento(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/agendamento/${id}`);
  }

  UpdateAgendamento(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/agendamento/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteAgendamento(agendamentoId: number) {
    return this.httpClient.delete(`${this.baseUrl}/agendamento/${agendamentoId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting agendamento:', error);
        return throwError('Something went wrong during deleting agendamento.');
      })
    );
  }
}


