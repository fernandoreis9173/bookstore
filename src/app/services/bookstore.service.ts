
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
})

export class BookstoreService {
  constructor(private httpClient: HttpClient) {
  }

  private readonly baseUrl = environment["endPoint"];

  registerBook(title: string, description: string, author: string, qtd: number) {

    return this.httpClient.post<any>(`${this.baseUrl}/book`, { title: title, description: description, author: author, qtd: qtd }).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
        return throwError('Something went wrong during registration.');
      }))
}

}
