import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bookstore } from 'src/app/models/Bookstore';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'

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

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }



  cadastro() {
    this.tipoTela = 2;
    this.bookstoreForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPorPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  getBook() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.bookstoreService.getBook()
      .subscribe((response: any) => {
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  bookstoreForm: FormGroup;

  ngOnInit() {
    this.getBook();
    this.menuService.menuSelecionado = 3;

    this.configpag();


    this.bookstoreForm = this.formBuilder.group(
      {
        id: [''],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        author: ['', [Validators.required]],
        qtd: ['', [Validators.required]]
      }
    );
  }

  get dadosForm() {
    return this, this.bookstoreForm.controls;
  }

  enviar() {
    if (this.itemEdicao) {
      this.bookstoreService.UpdateBook(

        this.bookstoreForm.value.id,
        this.bookstoreForm.value.title,
        this.bookstoreForm.value.description,
        this.bookstoreForm.value.author,
        this.bookstoreForm.value.qtd
      ).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.bookstoreForm.reset();
          this.getBook();
        },
        error => {
          console.error("Erro ao enviar:", error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    }
    else {
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
          this.getBook();
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

  itemEdicao: Bookstore;
  edicao(id: number) {
    this.bookstoreService.obterBook(id)
      .subscribe((response: Bookstore) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2

          var dados = this.dadosForm;
          dados["id"].setValue(this.itemEdicao.id);
          dados["title"].setValue(this.itemEdicao.title);
          dados["description"].setValue(this.itemEdicao.description);
          dados["author"].setValue(this.itemEdicao.author);
          dados["qtd"].setValue(this.itemEdicao.qtd);
        }
      },
        (error) => console.error(error),
        () => {
        })
  }
  cancelarEdicao(): void {
    this.getBook();
  }

  onDeleteBook(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this book?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        console.log("chegou bem aqui");
        this.bookstoreService.deleteBook(id)
        .subscribe(() => {
          this.snackBar.open('Registration deleted successfully.', 'Close', {
            duration: 2000,
          });
          this.getBook();
          this.bookstoreForm.reset();
        },
          error => {
            console.error("Erro ao enviar:", error);
            this.snackBar.open('Registration not deleted', 'Close', {
              duration: 2000,
            });
          }
        );
      }
    });

    
  }

}