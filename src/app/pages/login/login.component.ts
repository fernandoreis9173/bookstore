import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    public authService: AuthService) {

  }



  ngOnInit(): void {

    this.loginForm = this.formBuilder.group
      (
        {
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
        }
      );

      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  get dadosForm() {
    return this, this.loginForm.controls;
  }

  loginUser() {

    this.loginService.login(this.dadosForm["username"].value, this.dadosForm["password"].value).subscribe(
      result => {
        if (result && result.result && result.result.token) {
          this.authService.setToken(result.result.token)
          this.authService.UsuarioAutenticado(true)
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Login Successful.', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
        } else {
          console.error("Token not found in the response:", result);
        }
      },
      err => {
        this.snackBar.open('Unauthorized Access', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
      }

    )

  }

  // get registerForm() {
  //   return this, this.registerForm.controls;
  // }

  registerUser() {
    this.loginService.register(
      this.registerForm.value.username,
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe(
      token => {
        this.snackBar.open('Registration completed successfully.', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
        this.registerForm.reset();
      },
      err => {
        this.snackBar.open('registration not completed', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
      }
    );
  }


}
