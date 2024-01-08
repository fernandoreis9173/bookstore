import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent {
  bookstoreService: any;
  snackBar: any;

  constructor(public menuService: MenuService, public formBuilder: FormBuilder){
  }

  bookstoreForm: FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 3;

    this.bookstoreForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        descriptio: ['', [Validators.required]],
        author: ['', [Validators.required]],
        qtd: ['', [Validators.required]],
      }
    )
  }

  dadosForm(){
    return this.bookstoreForm.controls;
  }

  // enviar(){
  //   debugger
  //   var dados = this.dadosForm();

  //   alert(dados["title"].value)
  // }

  enviar() {
    this.bookstoreService.registerBook(
      this.bookstoreForm.value.title,
      this.bookstoreForm.value.descriptio,
      this.bookstoreForm.value.author,
      this.bookstoreForm.value.qtd
    ).subscribe(
      token => {
        this.snackBar.open('Registration completed successfully.', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
        this.bookstoreForm.reset();
      },
      err => {
        this.snackBar.open('registration not completed', 'Close', {
          duration: 2000, // duração em milissegundos (opcional)
        });
      }
    );
  }

}
