import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerFinanceiro(obj) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/agendamento`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getFinanceiro(dataInicial: string, dataFinal: string): Observable<any> {
    // Passando as datas na URL da requisição
    return this.httpClient.get(`${this.baseUrl}/agendamento/soma?dataInicial=${dataInicial}&dataFinal=${dataFinal}`).pipe(
      catchError((error) => {
        console.error('Error during fetching agendamento:', error);
        return throwError('Something went wrong during fetching agendamento.');
      })
    );
  }
  obterFinanceiro(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/agendamento/${id}`);
  }

  UpdateFinanceiro(obj) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/agendamento/${obj.id}`, obj)
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteFinanceiro(agendamentoId: number) {
    return this.httpClient.delete(`${this.baseUrl}/agendamento/${agendamentoId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting financeiro:', error);
        return throwError('Something went wrong during deleting financeiro.');
      })
    );
  }
}


