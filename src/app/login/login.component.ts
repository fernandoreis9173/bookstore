import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // loginObj: any = {
  //   "username": "",
  //   "password": ""
  // };

  // constructor(private http: HttpClient, private router: Router){}
  constructor( public formBuilder: FormBuilder,
               private router: Router,
               private loginService: LoginService){}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group
    (
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  get dadosForm(){
    return this, this.loginForm.controls;
  }

  loginUser(){
    // this.loginService.login(this.dadosForm["username"].value, this.dadosForm["password"].value).subscribe(
    //   token =>{
    //     alert(token);
    //   },
    //   err => {
    //     alert("Ocorreu um erro");
    //   }
    // )
  }

  // onLogin(){
  //   debugger;
  //   this.http.post('http://localhost:3000/auth/login', this.loginObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert('login Success')
  //       localStorage.setItem('loginToken', res.result.token)
  //       this.router.navigateByUrl('/dashboard')
  //     }else{
  //       alert(res.message);
  //     }
  //   },
  //   (error) => {
  //     console.error('Erro na solicitação HTTP:', error);
  //     alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
  //   });
  // }
}
