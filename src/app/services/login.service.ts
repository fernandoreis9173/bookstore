import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoginService
{
  // constructor ( private httpClient: HttpClient){}

  // private readonly baseUrl = environment["endPoint"];

  // login(username: string, password: string){
  //   return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, {username: username, password: password});
  // }
}
