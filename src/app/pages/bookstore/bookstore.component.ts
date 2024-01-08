import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent {

  constructor(public menuService: MenuService,
              public formBuilder: FormBuilder,
              private bookstoreService: BookstoreService,
              private snackBar: MatSnackBar){
  }

  bookstoreForm: FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 3;

    this.bookstoreForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        author: ['', [Validators.required]],
        qtd: ['', [Validators.required]]
      }
    );
  }

 get dadosForm(){
    return this, this.bookstoreForm.controls;
  }

  enviar() {

    this.bookstoreService.registerBook(
      this.bookstoreForm.value.title,
      this.bookstoreForm.value.description,
      this.bookstoreForm.value.author,
      this.bookstoreForm.value.qtd
    ).subscribe(
      () => {
        this.snackBar.open('Registration completed successfully.', 'Close', {
          duration: 2000,
        });
        this.bookstoreForm.reset();
      },
      error => {
        console.error("Erro ao enviar:", error);
        this.snackBar.open('Registration not completed', 'Close', {
          duration: 2000,
        });
      }
    );
}

}
