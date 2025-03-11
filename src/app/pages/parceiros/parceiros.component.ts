import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'
import { Parceiros } from 'src/app/models/parceiros';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-parceiros',
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.scss']
})
export class ParceirosComponent {

  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListParceiros: Array<Parceiros>
  originalListParceiros: Parceiros[] = [];
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  isSearchActive: boolean = false;

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
    this.parceirosForm.reset();
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

  getParceiros() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.parceirosService.getParceiros()
      .subscribe((response: any) => {
        if (response.result) {
          this.tableListParceiros = response.result;
          this.originalListParceiros = [...response.result]; // Salva a lista original
        } else {
          console.error('A propriedade "result" não existe no objeto de resposta.');
        }

        this.tableListParceiros = response.result;
      }, (error) => console.error(error),
        () => { })
  }

  searchTable(event: any): void {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.isSearchActive = searchTerm.length > 0;

    if (!this.isSearchActive) {
      this.tableListParceiros = [...this.originalListParceiros]; // Restaura a lista original
      return;
    }

    this.tableListParceiros = this.originalListParceiros.filter(agendamento =>
      Object.values(agendamento).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm)
      )
    );
  }

  constructor(public menuService: MenuService,
    public formBuilder: FormBuilder,
    private parceirosService: ParceirosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  parceirosForm: FormGroup;

  ngOnInit() {
    this.getParceiros();
    this.menuService.menuSelecionado = 3;

    this.configpag();


    this.parceirosForm = this.formBuilder.group(
      {
        id: [''],
        nameEmpresa: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        localizacao: ['', [Validators.required]],
        foneComercial: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        requisito: ['', [Validators.required]],
        turno: ['', [Validators.required]],
      }
    );
  }

  get dadosForm() {
    return this, this.parceirosForm.controls;
  }

  enviar() {
    const { id, ...parceiroData } = {
      id: this.parceirosForm.value.id,
      nameEmpresa: this.parceirosForm.value.nameEmpresa,
      cnpj: this.parceirosForm.value.cnpj,
      localizacao: this.parceirosForm.value.localizacao,
      foneComercial: this.parceirosForm.value.foneComercial,
      celular: this.parceirosForm.value.celular,
      requisito: this.parceirosForm.value.requisito,
      turno: this.parceirosForm.value.turno,
    };

    const obj = this.itemEdicao ? { id, ...parceiroData } : parceiroData;

    if (this.itemEdicao) {
      this.parceirosService.UpdateParceiros(obj).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.parceirosForm.reset();
          this.getParceiros();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.parceirosService.registerParceiros(obj).subscribe(
        (response: any) => { // O backend deve retornar o ID cadastrado
          this.snackBar.open('Registration completed successfully.', 'Close', {
            duration: 2000,
          });

          this.getParceiros();
          this.parceirosForm.reset();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registration not completed', 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }

  itemEdicao: Parceiros;
  edicao(id: number) {
    this.parceirosService.obterParceiros(id)
      .subscribe((response: Parceiros) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2

          var dados = this.dadosForm;
          dados["id"].setValue(this.itemEdicao.id);
          dados["nameEmpresa"].setValue(this.itemEdicao.nameEmpresa);
          dados["cnpj"].setValue(this.itemEdicao.cnpj);
          dados["localizacao"].setValue(this.itemEdicao.localizacao);
          dados["foneComercial"].setValue(this.itemEdicao.foneComercial);
          dados["celular"].setValue(this.itemEdicao.celular);
          dados["requisito"].setValue(this.itemEdicao.requisito);
          dados["turno"].setValue(this.itemEdicao.turno);
        }
      },
        (error) => console.error(error),
        () => {
        })
  }
  cancelarEdicao(): void {
    this.getParceiros();
  }

  onDeleteParceiros(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Parceiros?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.parceirosService.deleteParceiros(id)
        .subscribe(() => {
          this.snackBar.open('Registration deleted successfully.', 'Close', {
            duration: 2000,
          });
          this.getParceiros();
          this.parceirosForm.reset();
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
