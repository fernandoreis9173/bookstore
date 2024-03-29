import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class BookstoreService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['endPoint'];

  registerBook(
    title: string,
    description: string,
    author: string,
    qtd: number
  ) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/book`, {
        title: title,
        description: description,
        author: author,
        qtd: qtd,
      })
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  getBook(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/book/`).pipe(
      catchError((error) => {
        console.error('Error during fetching book:', error);
        return throwError('Something went wrong during fetching book.');
      })
    );
  }

  obterBook(id: number)
  {
    return this.httpClient.get(`${this.baseUrl}/book/${id}`);
  }

  UpdateBook(
    id: number,
    title: string,
    description: string,
    author: string,
    qtd: number
  ) {
    return this.httpClient
      .put<any>(`${this.baseUrl}/book/${id}`, {
        title: title,
        description: description,
        author: author,
        qtd: qtd,
      })
      .pipe(
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError('Something went wrong during registration.');
        })
      );
  }

  deleteBook(bookId: number) {
    return this.httpClient.delete(`${this.baseUrl}/book/${bookId}`).pipe(
      catchError((error) => {
        console.error('Error during deleting book:', error);
        return throwError('Something went wrong during deleting book.');
      })
    );
  }
}


