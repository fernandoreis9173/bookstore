
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService{

    private usuarioAutenticadoPortal: boolean = false;
    private token : any;
    private user : any;

    private readonly baseUrl = environment['endPoint'];

    constructor (private httpClient: HttpClient){}

    checkToken(){
      return Promise.resolve(true);
    }

    UsuarioAutenticado(status: boolean){
      localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
      this.usuarioAutenticadoPortal = status;
    }

    UsuarioEstaAutenticado(): Promise<boolean>{
      this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') == 'true';
      return Promise.resolve(this.usuarioAutenticadoPortal);
    }

    setToken(token: string){
      localStorage.setItem('token', token);
      this.token = token;
    }

    get getToken(){
      this.token = localStorage.getItem('token');
      return this.token;
    }

    limparToken(){
      this.token = null;
      this.user = null;
    }

    limparDadosUsuario(){
      this.UsuarioAutenticado(false);
      this.limparToken();
      localStorage.clear();
      sessionStorage.clear();
    }

    logout(): Observable<any> {
      return this.httpClient.post(`${this.baseUrl}/auth/logout`, {}); // Chama o backend para invalidar o token
    }

}
