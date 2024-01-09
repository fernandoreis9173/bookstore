import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bookstore } from 'src/app/models/Bookstore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent {

  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListBookstore: Array<Bookstore>
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  configpag(){
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config ={
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };
  }

  gerarIdParaConfigDePaginacao(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i =0; i < 10; i++){
      result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
    }
    return result;
  }



  cadastro(){
    this.tipoTela = 2;
    this.bookstoreForm.reset();
  }

  mudarItemsPorPage(){
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPorPage = this.itemsPorPagina;
  }

  mudarPage(event: any){
    this.page = event;
    this.config.currentPage = this.page;
  }

  getBook(){
    this.tipoTela = 1;

    this.bookstoreService.getBook()
    .subscribe((response: any) =>{
      if (response.result) {
        this.tableListBookstore = response.result;
      } else {
        console.error('A propriedade "result" não existe no objeto de resposta.');
      }

      this.tableListBookstore = response.result;
    }, (error) => console.error(error),
    () => { })
  }

  constructor(public menuService: MenuService,
              public formBuilder: FormBuilder,
              private bookstoreService: BookstoreService,
              private snackBar: MatSnackBar){
  }

  bookstoreForm: FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 3;

    this.configpag();
    this.getBook();

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
